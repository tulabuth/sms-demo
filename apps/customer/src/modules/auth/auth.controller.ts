import { Controller, Get, Post, Body, Patch, Param, Delete,Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@ApiTags('MEMBER')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  ip(@Request() req: IRequest) {
    return {
      'x-forwarded-for': req.headers['x-forwarded-for'],
      'cf-connecting-ip': req.headers['cf-connecting-ip'],
      remoteAddress: req.socket.remoteAddress,
      ip: req.ip,
      ips: req.ips,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        statusCode: 401,
        message: 'Something is wrong',
        error: 'Unauthorized',
      },
    },
  })
  login(@Body() createAuthDto:LoginAuthDto) {
    return this.authService.login(createAuthDto);
  }
}
