<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">NestJS SAP RFC Client</p>

![npm](https://img.shields.io/npm/v/@grupoboticario/nestjs-sap-rfc)
![GitHub package.json version](https://img.shields.io/github/package-json/v/grupoboticario/nestjs-sap-rfc)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/grupoboticario/nestjs-sap-rfc/node-rfc)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/grupoboticario/nestjs-sap-rfc/CI)
[![codecov](https://codecov.io/gh/grupoboticario/nestjs-sap-rfc/branch/main/graph/badge.svg?token=J4TKJNQYCD)](https://codecov.io/gh/alvarolimajr/nestjs-sap-rfc)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
![GitHub](https://img.shields.io/github/license/grupoboticario/nestjs-sap-rfc)
![npm type definitions](https://img.shields.io/npm/types/@grupoboticario/nestjs-sap-rfc)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/grupoboticario/nestjs-sap-rfc.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/grupoboticario/nestjs-sap-rfc/context:javascript)
![GitHub repo size](https://img.shields.io/github/repo-size/grupoboticario/nestjs-sap-rfc)
![npm](https://img.shields.io/npm/dw/@grupoboticario/nestjs-sap-rfc)

## 📚 Description

NestJS SAP RFC Client, providing convenient ABAP business logic consumption from NestJS

## 🛠️ Installation

[SAP NWRFC SDK installation](https://github.com/SAP/node-rfc/blob/main/doc/installation.md#sap-nwrfc-sdk-installation)

```bash
npm install @grupoboticario/nestjs-sap-rfc --save
```

## 🏃 Getting Started

Register `SapModule` module in app.module.ts

[Connection Pool](https://github.com/SAP/node-rfc/blob/main/doc/usage.md#connection-pool)

```ts
import { SapModule } from '@grupoboticario/nestjs-sap-rfc';
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
import { SapModule } from '@grupoboticario/nestjs-sap-rfc';
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
import { SapModule } from '@grupoboticario/nestjs-sap-rfc';
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
import { SapModule } from '@grupoboticario/nestjs-sap-rfc';
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
import { SapModule } from '@grupoboticario/nestjs-sap-rfc';
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
import { SapModule } from '@grupoboticario/nestjs-sap-rfc';
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
import { InjectSapService, SapService } from '@grupoboticario/nestjs-sap-rfc';
import { Injectable } from '@nestjs/common';

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
import { InjectSapService, SapService } from '@grupoboticario/nestjs-sap-rfc';
import { Inject } from '@nestjs/common';

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

[See documentation](https://grupoboticario.github.io/nestjs-sap-rfc/)

## ⬆️ Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `npm run commit` instead of `git commit` to use commitizen.

## 👥 Stay in touch

- E-mail - [Alvaro Lima Junior](mailto:alvaro.junior@grupoboticario.com.br)

## 🔨 Built With

- [NestJS](https://github.com/nestjs/nest)
- [node-rfc](https://github.com/SAP/node-rfc)

## ✔️ Roadmap

The following improvements are currently in progress:

- [x] Dynamic Configuration
