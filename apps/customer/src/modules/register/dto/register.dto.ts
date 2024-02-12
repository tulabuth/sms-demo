import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsLocale, IsNotEmpty, IsPhoneNumber, IsString, IsTimeZone, Length, MaxLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        type: String,
        example: 'john.doe@gmail.com',
        required: true,
        description: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        example: 'root9999',
        required: true,
        description: 'password'
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        example: 'root9999',
        required: true,
        description: 'password'
    })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    
      @ApiProperty({
        type: String,
        example: 'th',
        required: true,
        description: 'ภาษา / เขตสถานที่ / ประเทศ',
      })
      @IsNotEmpty()
      locale: string;
    
      @ApiProperty({
        type: String,
        example: 'John',
        required: true,
        description: 'ชื่อ',
      })
      @IsString()
      @IsNotEmpty()
      @MaxLength(255)
      firstName: string;
    
      @ApiProperty({
        type: String,
        example: 'Doe',
        required: true,
        description: 'นามสกุล',
      })
      @IsString()
      @IsNotEmpty()
      @MaxLength(255)
      lastName: string;
    
      @ApiProperty({
        type: String,
        example: '0802938192',
        required: true,
        description: 'เบอร์โทรศัพท์มือถือ',
      })
      @IsString()
      @IsNotEmpty()
      @IsPhoneNumber('TH')
      phone: string;
    
      @ApiProperty({
        type: String,
        example: '34000',
        required: true,
        description: 'รหัสไปรษณีย์',
      })
      @IsString()
      @IsNotEmpty()
      postcode: string;
    
      @ApiProperty({
        type: String,
        example: '69/69 บ้านกกกอง',
        required: true,
        description: 'ที่อยู่',
      })
      @IsString()
      @IsNotEmpty()
      address: string;
    
      @ApiProperty({
        type: String,
        example: 'google',
        required: true,
        description: 'ชื่อบริษัท',
      })
      @IsString()
      @IsNotEmpty()
      company: string;
    
      @ApiProperty({
        type: String,
        example: 'กกกอก',
        required: true,
        description: 'เมือง',
      })
      @IsString()
      @IsNotEmpty()
      city: string;
    
      @ApiProperty({
        type: String,
        example: 'Thailand',
        required: true,
        description: 'ประเทศ',
      })
      @IsString()
      @IsNotEmpty()
      country: string;


}
