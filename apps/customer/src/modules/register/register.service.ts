import { CgUsers } from '@app/common/entities/CgUsers';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { CgCustomers } from '@app/common/entities/CgCustomers';
import { RegisterResponseDto } from './dto/register-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { dayjsTz } from '@app/common/utils/dayjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(CgUsers)
    private readonly userRepository: Repository<CgUsers>,
    @InjectRepository(CgCustomers)
    private readonly customerRepository: Repository<CgCustomers>,
    private jwtService:JwtService
  ){}
  private readonly logger = new Logger(RegisterService.name);

  async register(body: RegisterDto):Promise<RegisterResponseDto>{
    console.log("this is body",body);
    //const now =  dayjsTz();
    const password = await this.hashPassword(body.password);
    const userBody:CgUsers = new CgUsers();
    userBody.password = password;
    userBody.email = body.email;
    userBody.firstName = body.firstName;
    userBody.lastName = body.lastName;
    userBody.locale = body.locale;
    userBody.activePortal = 'customer';
    
    const user = await this.userRepository.save<CgUsers>(userBody);

    const customerBodu: CgCustomers = new CgCustomers();
    customerBodu.userId = user.id;
    customerBodu.phone = body.phone;
    customerBodu.address = body.address;
    customerBodu.company = body.company;
    customerBodu.city = body.city;
    customerBodu.postcode = body.postcode;
    customerBodu.country = body.country;
    //customerBodu.createdAt = now.toDate();
    //customerBodu.updatedAt = now.toDate();
    await this.customerRepository.save<CgCustomers>(customerBodu);

    const loginPayload = {email: body.email, sub:user.id, id:user.id}
    const accessToken = this.jwtService.sign(loginPayload);
    this.logger.log(
      `username: ${user.email} - register success -${new Date()}`,
    );

    return {
      accessToken,
      data: user,
      message: 'สมัครสมาชิกสำเร็จ'
    }
  }

  private async hashPassword(password: string):Promise<string>{
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async isEmailExist(email: string):Promise<boolean>{
    const user = await this.userRepository.findOne({where:{email}});
    return !!user;
  }

  async isPhoneExist(phone:string):Promise<boolean>{
    const customer = await this.customerRepository.findOne({where: {phone}});
    return !!customer;
  }
}
