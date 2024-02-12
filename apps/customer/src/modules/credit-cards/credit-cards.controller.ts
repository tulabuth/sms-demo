import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createCreditCardDto } from './dto/create-credit-card.dto';



@Controller('credit-cards')
@ApiTags('MEMBER')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post('check-validity')
  async checkCreditValidity(@Body()  body:createCreditCardDto): Promise<{ valid: boolean }> {
    const { number, expMonth, expYear, cvc } = body;
    const isValid = await this.creditCardsService.checkCreditCardValidity(body);
    return { valid: isValid };
  }

 

  @Get()
  findAll() {
    return this.creditCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardsService.findOne(+id);
  }

 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditCardsService.remove(+id);
  }
}
