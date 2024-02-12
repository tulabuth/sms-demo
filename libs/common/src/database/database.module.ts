import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDev = (process.env.NODE_ENV || '') === 'development';

        if (isDev) {
          console.log(
            `Your are in ${process.env.NODE_ENV} mode, database will synchronized`,
          );
        }

        return {
          type: configService.get('app.database'),
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          database: configService.get('mysql.database'),
          autoLoadEntities: true,
          synchronize: isDev,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
