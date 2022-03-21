import { RfcCallOptions, RfcObject } from 'node-rfc';

export interface SapService {
  /**
   *
   * @param rfcName
   * @param rfcParams
   * @param options
   */
  execute<T extends RfcObject>(
    rfcName: string,
    rfcParams: RfcObject,
    options?: RfcCallOptions,
  ): Promise<T>;
}
