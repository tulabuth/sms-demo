import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { CgSubscriptions } from '@app/common/entities/CgSubscriptions';
import { ApiCommonErrorResponse } from '@app/common/database/decorator/api-common-error-response.decorator';
import { User } from '@app/common/database/decorator/user.decorator';
import { CgUsers } from '@app/common/entities/CgUsers';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('user/current')
  @ApiOkResponse({
    description: "Success",
    type: CgSubscriptions,
  })
  @ApiCommonErrorResponse()
  async getCurrentSubscription(
    @User() user: CgUsers,
  ): Promise<CgSubscriptions>{
    const subscription = await this.subscriptionService.getByUserIdWithPlan(user.id.toString());

    if(!subscription){
      return null;
    }

    subscription.options = JSON.parse(subscription?.options);
    subscription.plan.options = JSON.parse(subscription?.plan?.options)
    return subscription;
  }
}
