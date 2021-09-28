import { Inject } from '@nestjs/common';
import { SAP_CLIENT, SAP_POOL, SAP_SERVICE } from './constants';

export function InjectSapPool(): ParameterDecorator {
  return Inject(SAP_POOL);
}

export function InjectSapClient(): ParameterDecorator {
  return Inject(SAP_CLIENT);
}

export function InjectSapService(): ParameterDecorator {
  return Inject(SAP_SERVICE);
}
