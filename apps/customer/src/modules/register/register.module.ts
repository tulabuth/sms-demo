import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CgUsers } from '@app/common/entities/CgUsers';
import { CgCustomers } from '@app/common/entities/CgCustomers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([CgUsers,CgCustomers]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),}),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
