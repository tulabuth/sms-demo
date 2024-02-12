import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({
        type: String,
        required: true,
        default: 'john.doe@gmail.com',
        description: 'username',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        required: true,
        default: 'root9999',
        description: 'password'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
