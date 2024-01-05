import { RfcCallOptions, RfcObject } from 'node-rfc';
import { SapClient } from '../types';

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

  /**
   * Wraps given function execution (and all operations made there) in a transaction.
   * All SAP operations must be executed using provided client.
   */
  transaction<T>(
    runInTransaction: (sapClient: SapClient) => Promise<T>,
  ): Promise<T>;
}
