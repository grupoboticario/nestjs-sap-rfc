import { Injectable, Logger } from '@nestjs/common';
import { RfcCallOptions, RfcObject } from 'node-rfc';
import {
  BAPI_TRANSACTION_COMMIT,
  BAPI_TRANSACTION_ROLLBACK,
} from '../constants';
import { InjectSapClient } from '../inject.decorator';
import { SapClient } from '../types';
import { SapService } from './sap-service.interface';
import { SapTransactionService } from './sap-transaction.serivce';

@Injectable()
export class SapClientService implements SapService {
  /**
   * Logger
   */
  private readonly logger = new Logger(SapClientService.name);

  /**
   *
   * @param sapClient
   */
  constructor(
    @InjectSapClient()
    private readonly sapClient: SapClient,
  ) {}

  /**
   *
   * @param rfcName
   * @param rfcParams
   * @param options
   * @returns
   */
  public async execute<T extends RfcObject>(
    rfcName: string,
    rfcParams: RfcObject,
    options?: RfcCallOptions,
  ): Promise<T> {
    try {
      await this.sapClient.open();
      return this.sapClient.call(rfcName, rfcParams, options) as Promise<T>;
    } finally {
      // this connection will be closed by the client or automatically
    }
  }

  /**
   *
   * @param runInTransaction
   * @returns
   */
  public async transaction<T>(
    runInTransaction: (sapService: SapService) => Promise<T>,
  ): Promise<T> {
    try {
      await this.sapClient.open();
      const result = await runInTransaction(
        new SapTransactionService(this.sapClient),
      );
      await this.sapClient.call(BAPI_TRANSACTION_COMMIT, {});
      return result;
    } catch (err: any) {
      // we throw original error even if rollback thrown an error
      try {
        await this.sapClient.call(BAPI_TRANSACTION_ROLLBACK, {});
      } catch (rollbackError: any) {
        this.logger.error('Failed to rollback transaction', rollbackError);
      }

      throw err;
    } finally {
      // this connection will be closed by the client or automatically
    }
  }
}
