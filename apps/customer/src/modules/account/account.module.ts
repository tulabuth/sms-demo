import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CgUsers } from '@app/common/entities/CgUsers';
import { CgCustomers } from '@app/common/entities/CgCustomers';

@Module({
  imports: [
    TypeOrmModule.forFeature([CgUsers,CgCustomers]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
