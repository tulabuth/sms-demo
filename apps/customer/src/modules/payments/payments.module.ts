import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { GbprimaryModule } from './gbprimary/gbprimary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CgUsers } from '@app/common/entities/CgUsers';
import { Gateways } from '@app/common/entities/Gateways';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import { GbprimaryService } from './gbprimary/gbprimary.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,GbprimaryService],
  imports: [GbprimaryModule,HttpModule ,TypeOrmModule.forFeature([CgUsers,Gateways,GatewayCurrencies])],
})
export class PaymentsModule {}
