import { Injectable } from '@nestjs/common';
import { RfcCallOptions, RfcObject } from 'node-rfc';
import { InjectSapClient } from '../inject.decorator';
import { SapClient } from '../types';
import { SapService } from './sap-service.interface';

@Injectable()
export class SapClientService implements SapService {
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
}
