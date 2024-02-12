import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from '@app/common/database/decorator/user.decorator';
import { UserIdDto } from '../account/dto/user-id-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
@ApiTags('PAYMENTS')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('makepayment')
  create(@Body() body: CreatePaymentDto,@User() user:UserIdDto){
    return this.paymentsService.makePayment(body,user);
  }
 
  @Post('testpost')
  testpost(@Body() body: CreatePaymentDto){
    return body;
  }
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':methodCode')
  findOne(@Param('methodCode') methodCode: number, @User() user: UserIdDto) {
    return this.paymentsService.findOne(+methodCode, user);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
