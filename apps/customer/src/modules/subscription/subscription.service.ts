import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CgSubscriptions } from '@app/common/entities/CgSubscriptions';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(CgSubscriptions)
    private readonly subScriptionReposotory: Repository<CgSubscriptions>,
  ){}

  async getByUserIdWithPlan(userId: string):Promise<CgSubscriptions>{
    return this.subScriptionReposotory.findOne({
      relations: ['plan'],
      where: {userId},
      order: { id: 'DESC'}
    })
  }

}
