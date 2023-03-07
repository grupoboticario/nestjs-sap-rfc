<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">NestJS SAP RFC Client</p>

[![GitHub](https://img.shields.io/github/license/grupoboticario/nestjs-sap-rfc)](https://github.com/grupoboticario/nestjs-sap-rfc/blob/main/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/grupoboticario/nestjs-sap-rfc/CI)](https://github.com/grupoboticario/nestjs-sap-rfc/actions/workflows/ci.yml)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/grupoboticario/nestjs-sap-rfc)](https://github.com/grupoboticario/nestjs-sap-rfc)
[![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/grupoboticario/nestjs-sap-rfc/node-rfc)](https://github.com/SAP/node-rfc)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=b15648de-145e-4a88-87e7-b2a57e04eaeb&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=b15648de-145e-4a88-87e7-b2a57e04eaeb)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=b15648de-145e-4a88-87e7-b2a57e04eaeb&metric=coverage)](https://sonarcloud.io/summary/new_code?id=b15648de-145e-4a88-87e7-b2a57e04eaeb)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=b15648de-145e-4a88-87e7-b2a57e04eaeb&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=b15648de-145e-4a88-87e7-b2a57e04eaeb)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=b15648de-145e-4a88-87e7-b2a57e04eaeb&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=b15648de-145e-4a88-87e7-b2a57e04eaeb)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=b15648de-145e-4a88-87e7-b2a57e04eaeb&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=b15648de-145e-4a88-87e7-b2a57e04eaeb)
[![GitHub repo size](https://img.shields.io/github/repo-size/grupoboticario/nestjs-sap-rfc)](https://github.com/grupoboticario/nestjs-sap-rfc)
[![npm](https://img.shields.io/npm/v/nestjs-sap-rfc)](https://www.npmjs.com/package/nestjs-sap-rfc)
[![npm type definitions](https://img.shields.io/npm/types/nestjs-sap-rfc)](https://www.typescriptlang.org)
[![npm](https://img.shields.io/npm/dw/nestjs-sap-rfc)](https://www.npmjs.com/package/nestjs-sap-rfc)

## 📚 Description

NestJS SAP RFC Client, providing convenient ABAP business logic consumption from NestJS

## 🛠️ Installation

[SAP NWRFC SDK installation](https://github.com/SAP/node-rfc/blob/main/doc/installation.md#sap-nwrfc-sdk-installation)

```bash
npm install nestjs-sap-rfc --save
```

## 🏃 Getting Started

Register `SapModule` module in app.module.ts

[Connection Pool](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#connection-pool)

```ts
import { SapModule } from 'nestjs-sap-rfc';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SapModule.createPool({
      isGlobal: true, // for global module
      name: 'service_name', // for multiple modules (OPTIONAL)
      connectionParameters: {
        /* see RfcConnectionParameters */
      },
      clientOptions: {
        /* see RfcClientOptions */
      },
      poolOptions: {
        /* see RfcPoolOptions */
      },
    }),
  ],
})
export class AppModule {}
```

[Connection Pool](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#connection-pool) (Async Module)

```ts
import { SapModule } from 'nestjs-sap-rfc';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SapModule.createPoolAsync({
      isGlobal: true, // for global module
      name: 'service_name', // for multiple modules (OPTIONAL)
      useFactory: () => {
        return {
          connectionParameters: {
            /* see RfcConnectionParameters */
          },
          clientOptions: {
            /* see RfcClientOptions */
          },
          poolOptions: {
            /* see RfcPoolOptions */
          },
        };
      },
    }),
  ],
})
export class AppModule {}
```

[Connection Pool](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#connection-pool) (Async Module + ConfigService)

```ts
import { SapModule } from 'nestjs-sap-rfc';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SapModule.createPoolAsync({
      isGlobal: true, // for global module
      name: 'service_name', // for multiple modules (OPTIONAL)
      useFactory: (config: ConfigService) => {
        return {
          connectionParameters: {
            /* see RfcConnectionParameters */
            /* config.get(...) */
          },
          clientOptions: {
            /* see RfcClientOptions */
            /* config.get(...) */
          },
          poolOptions: {
            /* see RfcPoolOptions */
            /* config.get(...) */
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

[Direct Client](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#client)

```ts
import { SapModule } from 'nestjs-sap-rfc';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SapModule.createClient({
      isGlobal: true, // for global module
      name: 'service_name', // for multiple modules (OPTIONAL)
      /* ...RfcConnectionParameters */
    }),
  ],
})
export class AppModule {}
```

[Direct Client](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#client) (Async Module)

```ts
import { SapModule } from 'nestjs-sap-rfc';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SapModule.createClientAsync({
      isGlobal: true, // for global module
      name: 'service_name', // for multiple modules (OPTIONAL)
      useFactory: () => {
        return {
          /* ...RfcConnectionParameters */
        };
      },
    }),
  ],
})
export class AppModule {}
```

[Direct Client](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#client) (Async Module + ConfigService)

```ts
import { SapModule } from 'nestjs-sap-rfc';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SapModule.createClientAsync({
      isGlobal: true, // for global module
      name: 'service_name', // for multiple modules (OPTIONAL)
      useFactory: (config: ConfigService) => {
        return {
          /* ...RfcConnectionParameters */
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

Inject SapService

```ts
import {
  InjectSapService,
  SapService,
  SapRfcObject,
  SapRfcStructure,
} from 'nestjs-sap-rfc';
import { Injectable } from '@nestjs/common';

// RfcStructure
type PositionData = SapRfcStructure; // SAP structure

// RfcStructure
interface NestedData extends SapRfcStructure {
  readonly E_NESTED?: string; // SAP field name
}

// MySapInterface
interface MySapInterface extends SapRfcObject {
  readonly E_NAME?: string; // SAP field name
  readonly E_DATA?: PositionData; // SAP field name
  readonly E_DATA2?: NestedData; // SAP field name
  readonly E_ERROR?: string; // SAP field name
  readonly I_OBJID?: string; // SAP field name
}

@Injectable()
export class MyService {
  /**
   * @param {SapService} sapService
   */
  constructor(
    @InjectSapService()
    private readonly sapService: SapService,
  ) {}

  public async test(): MySapInterface {
    return this.sapService.execute<MySapInterface>('rfcName', {
      ...rfcParams,
    });
  }
}
```

Inject SapService by name

```ts
import {
  InjectSapService,
  SapService,
  SapRfcObject,
  SapRfcStructure,
} from 'nestjs-sap-rfc';
import { Inject } from '@nestjs/common';

// RfcStructure
type PositionData = SapRfcStructure; // SAP structure

// RfcStructure
interface NestedData extends SapRfcStructure {
  readonly E_NESTED?: string; // SAP field name
}

// MySapInterface
interface MySapInterface extends SapRfcObject {
  readonly E_NAME?: string; // SAP field name
  readonly E_DATA?: PositionData; // SAP field name
  readonly E_DATA2?: NestedData; // SAP field name
  readonly E_ERROR?: string; // SAP field name
  readonly I_OBJID?: string; // SAP field name
}

@Injectable()
export class MyService {
  /**
   * @param {SapService} sapService
   */
  constructor(
    @Inject('service_name')
    private readonly sapService: SapService,
  ) {}

  public async test(): MySapInterface {
    return this.sapService.execute<MySapInterface>('rfcName', {
      ...rfcParams,
    });
  }
}
```

## ✅ Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## 💡 Generate Docs

The docs can be generated on-demand. This will produce a **documentation** folder with the required front-end files.

```bash
# generate docs for code
$ npm run doc

# generate docs for code and serve on http://localhost:8080
$ npm run doc:serve
```

## ⬆️ Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `npm run commit` instead of `git commit` to use commitizen.

## 🔨 Built With

- [NestJS](https://github.com/nestjs/nest)
- [node-rfc](https://github.com/SAP/node-rfc)

## ✔️ Roadmap

The following improvements are currently in progress:

- [x] Dynamic Configuration
