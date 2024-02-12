import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CgUsers } from '@app/common/entities/CgUsers';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CgUsers)
    private readonly userRepository: Repository<CgUsers>,
    private readonly jwtService: JwtService,
  ){}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string){
    const option = {where:{email: email}}
    const user = await this.userRepository.findOne(option);
    if (user) {
      const isValid = await this.comparePasswordHash(password, user.password);
      if (isValid) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(body: LoginAuthDto):Promise<LoginResponseDto>{
    const username = body.username;
    const password = body.password;
    const user = await this.validateUser(username, password);
    if (user != null) {
      const payload = {email: username, id: user.id, sub: user.id};
      this.logger.log(`username: ${username}, Login sucesss-${Date}`);
      
      return {
        data: user,
        access_token: this.jwtService.sign(payload),
        message: "Login Success",
        isSuccess: true,
      }
    }

    this.logger.log(`username: ${username}, Login failed-${Date}`);
    throw new UnauthorizedException(`username: ${username}, Login failed - ${Date}`);
   
  }
  async comparePasswordHash(password,DbPassword):Promise<boolean>{
    return await bcrypt.compare(password, DbPassword);
  }
  async getUserById(id: number):Promise<CgUsers>{
    return await this.userRepository.findOne({where:{id}})
  }
}
