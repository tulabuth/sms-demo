import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CgSubscriptions } from '@app/common/entities/CgSubscriptions';

@Module({
  imports: [
    TypeOrmModule.forFeature([CgSubscriptions])
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
