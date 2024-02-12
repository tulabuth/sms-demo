import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CgPlans } from '@app/common/entities/CgPlans';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CgPlans
    ]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
