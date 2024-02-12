import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {

    @ApiProperty({
        type:Number,
        example: '100',
        nullable: false,
    })
    @IsNumber()
    amount: number;
  
    @ApiProperty({
        type:Number,
        example: '78',
        nullable: false,
    })
    @IsNumber()
    method_code: number;

    @ApiProperty({
        type:String,
        example: 'THB',
        nullable: false,
    })
    @IsString()
    currency: string;

}
