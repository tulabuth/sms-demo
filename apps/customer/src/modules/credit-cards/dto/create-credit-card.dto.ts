import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class createCreditCardDto {
  @ApiProperty({ description: 'Credit card number' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Expiration month', example: 12 })
  @IsNumber()
  expMonth: number;

  @ApiProperty({ description: 'Expiration year', example: 2024 })
  @IsNumber()
   expYear: number;

  @ApiProperty({ description: 'CVC (Card Verification Code)' })
  @IsString()
  cvc: string;
}