import { ApiProperty } from "@nestjs/swagger";

export class UserIdDto{
    @ApiProperty({
        type: Number,
        required: true,
        default: '',
        description: 'customer id'
    })
    id: number;
}