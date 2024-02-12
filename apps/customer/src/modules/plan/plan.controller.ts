import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiPaginationQuery, PaginationOptions } from '@app/common/database/decorator/pagination.decorator';
import { CgPlans } from '@app/common/entities/CgPlans';
import { ApiPaginationResponse, IPagination, IPaginationOptions } from '@app/common/database/pagination';
import { ApiCommonErrorResponse } from '@app/common/database/decorator/api-common-error-response.decorator';


@Controller('plans')
@ApiTags('MEMBER')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  @ApiPaginationQuery()
  @ApiPaginationResponse(CgPlans)
  @ApiCommonErrorResponse()
  async pagination(
    @PaginationOptions() options: IPaginationOptions,
  ): Promise<IPagination<CgPlans>>{
    return await this.planService.pagination(options);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success',
    type: CgPlans,
  })
  @ApiCommonErrorResponse()
  async findOne(@Param('id') id:number):Promise<CgPlans>{
    return  await this.planService.getPlanById(id);
    
  }
}
