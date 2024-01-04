import { Inject } from '@nestjs/common';
import {
  SAP_CLIENT,
  SAP_CONNECTION_OPTIONS,
  SAP_POOL,
  SAP_POOL_CONNECTION_OPTIONS,
  SAP_SERVICE,
} from './constants';
import { createToken } from './create-token';

/**
 *
 * @param name
 * @returns
 */
export function InjectSapPoolConnectionOptions(
  name?: string,
): PropertyDecorator & ParameterDecorator {
  return Inject(createToken(name, SAP_POOL_CONNECTION_OPTIONS));
}

/**
 *
 * @param name
 * @returns
 */
export function InjectSapConnectionOptions(
  name?: string,
): PropertyDecorator & ParameterDecorator {
  return Inject(createToken(name, SAP_CONNECTION_OPTIONS));
}

/**
 *
 * @param name
 * @returns
 */
export function InjectSapPool(
  name?: string,
): PropertyDecorator & ParameterDecorator {
  return Inject(createToken(name, SAP_POOL));
}

/**
 *
 * @param name
 * @returns
 */
export function InjectSapClient(
  name?: string,
): PropertyDecorator & ParameterDecorator {
  return Inject(createToken(name, SAP_CLIENT));
}

/**
 *
 * @param name
 * @returns
 */
export function InjectSapService(
  name?: string,
): PropertyDecorator & ParameterDecorator {
  return Inject(name || SAP_SERVICE);
}
