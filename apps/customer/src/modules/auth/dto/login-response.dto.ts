import { CgUsers } from "@app/common/entities/CgUsers";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto{
    @ApiProperty({
    type:CgUsers,
    example: {}
    })
    data: CgUsers;

    @ApiProperty({
        type: String,
        example: 'esldjfois4oj3409i90sfsldjfsjdfsjdfsfjsljfosjfo9990sfsdfjsdfjas',
    })
    access_token: string;

    @ApiProperty({
        type: String,
        example: "เข้าสู่ระบบสำเร็จ"
    })
    message: string;

    @ApiProperty({
        type: Boolean,
        example: true,
    })
    isSuccess: boolean;
}