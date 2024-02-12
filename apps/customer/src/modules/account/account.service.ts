import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CgCustomers } from '@app/common/entities/CgCustomers';
import { Repository } from 'typeorm';
import { UserIdDto } from './dto/user-id-dto';
import { CgUsers } from '@app/common/entities/CgUsers';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(CgCustomers)
    private readonly customersReposity: Repository<CgCustomers>,
    @InjectRepository(CgUsers)
    private readonly usersRepository: Repository<CgUsers>,
  ){}

  async profile(body: UserIdDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: body.id
      },
    }) as any;

    const customerData = await this.customersReposity.findOne({where:{
      userId: user.id,
    }})

    user.customer = customerData;

    return {
      data: user,
      isSuccess: true,
    }
  }

  
}
