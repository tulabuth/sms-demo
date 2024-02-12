import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CgPlans } from '@app/common/entities/CgPlans';
import { Repository } from 'typeorm';
import { IPagination, IPaginationOptions, paginate } from '@app/common/database/pagination';
import { Exception } from '@app/common/core/errors/exception';
import { dbError } from '@app/common/core/errors/message';


@Injectable()
export class PlanService {
 constructor(
  @InjectRepository(CgPlans)
  private readonly plansRepository: Repository<CgPlans>,
 ){}

 async pagination(options: IPaginationOptions):Promise<IPagination<CgPlans>>{
  try {
    return await paginate<CgPlans>(this.plansRepository,options);
  } catch (e) {
    throw new Exception(e, dbError);
  }
 }

 async getPlanById(id:number, select?: Record<string, any>):Promise<any>{
  const plan = await this.plansRepository.findOne({where: {id}, select: select || {} });
  if (!plan) {
    throw new NotFoundException(`Plan with ID ${id} not found!`);
  }
  return plan?.options;
 }

}
