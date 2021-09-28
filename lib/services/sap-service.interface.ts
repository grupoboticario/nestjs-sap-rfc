import { RfcObject } from 'node-rfc';

export interface SapService {
  /**
   *
   * @param rfcName
   * @param rfcParams
   */
  execute<T extends RfcObject>(
    rfcName: string,
    rfcParams: RfcObject,
  ): Promise<T>;
}
