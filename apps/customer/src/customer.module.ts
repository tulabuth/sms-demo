import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getModuleMember } from './modules/member.util';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory:ormConfig,
    }),
    ...getModuleMember(),
  ],
  controllers: [],
  providers: [],
})
export class CustomerModule {}
