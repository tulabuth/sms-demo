import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, BadRequestException } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiCommonErrorResponse } from '@app/common/database/decorator/api-common-error-response.decorator';
import { RegisterDto } from './dto/register.dto';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  private readonly logger = new Logger(RegisterController.name);
  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    type: RegisterResponseDto,
  })
  @ApiCommonErrorResponse()
  async register(@Body() body: RegisterDto):Promise<RegisterResponseDto>{
    let res: RegisterResponseDto;
    try {
      res = await this.registerService.register(body);
    } catch (error) {
      this.logger.error(error.message ?? error);
      throw new BadRequestException(error.message ?? error);
    }
    
    return res;
  }
}
