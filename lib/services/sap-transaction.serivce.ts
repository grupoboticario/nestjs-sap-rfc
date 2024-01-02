import { RfcCallOptions, RfcObject } from 'node-rfc';
import { SapClient } from '../types';
import { SapService } from './sap-service.interface';

export class SapTransactionService implements SapService {
  /**
   *
   * @param sapClient
   */
  constructor(private readonly sapClient: SapClient) {}

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
    return (await this.sapClient.call(rfcName, rfcParams, options)) as T;
  }
}
