import { CgUsers } from '@app/common/entities/CgUsers';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterResponseDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string;

  @ApiProperty({
    type: CgUsers,
    example: {},
  })
  data: CgUsers;

  @ApiProperty({
    type: String,
    example: 'สมัครสมาชิกสำเร็จ',
  })
  message: string;
}
