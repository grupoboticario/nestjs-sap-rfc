import { Injectable } from '@nestjs/common';
import { RfcObject } from 'node-rfc';
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
   */
  public async execute<T extends RfcObject>(
    rfcName: string,
    rfcParams: RfcObject,
  ): Promise<T> {
    await this.sapClient.open();
    return this.sapClient.call(rfcName, rfcParams) as Promise<T>;
  }
}
