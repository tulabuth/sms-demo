import { Module } from '@nestjs/common';
import { GbprimaryService } from './gbprimary.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposits } from '@app/common/entities/CgDeposits';
import { Gateways } from '@app/common/entities/Gateways';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';

@Module({
  imports:[
    HttpModule,TypeOrmModule.forFeature([Deposits,Gateways,GatewayCurrencies])
  ],
  controllers: [],
  providers: [GbprimaryService],
  exports:[TypeOrmModule.forFeature([Deposits, Gateways, GatewayCurrencies])]
})
export class GbprimaryModule {}
