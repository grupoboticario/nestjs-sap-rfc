import { Test, TestingModule } from '@nestjs/testing';
// import * as dotenv from 'dotenv';
import { SAP_SERVICE, SapModule, SapService } from '../lib';

describe('SAP (e2e)', () => {
  let service: SapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SapModule.createPool({
          isGlobal: true,
          connectionParameters: {
            ashost: 'eccqasapp.boticario.net',
            user: 'RFCAPIGEE',
            passwd: 'Bronx12#',
            sysnr: '01',
            client: '500',
            lang: 'PT',
          },
          poolOptions: {
            high: 4,
            low: 2,
          },
        }),
      ],
    }).compile();

    service = module.get<SapService>(SAP_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get position', async () => {
    const SAP_RFC = 'ZHRF_PASAD_ARET_POSICAO';

    const params = {
      I_OBJID: '80180074',
    };

    const response = await service.execute(SAP_RFC, params);

    console.log(response);

    expect(response.E_AVISO).toEqual(
      ' Posição está sendo ocupada pelo colaborador 00021637 . Favor solicitar correção junto a equipe responsável',
    );
  });

  // it('should commit in transation', async () => {
  //   const SAP_RFC = 'ZHRF_PASAD_ARET_POSICAO';

  //   const params = {
  //     I_OBJID: '80180074',
  //   };

  //   await service.transaction(async (sapClient) => {
  //     await sapClient.call(SAP_RFC, params);
  //   });

  //   expect(Client.call).toHaveBeenCalledTimes(1);
  // });
});
