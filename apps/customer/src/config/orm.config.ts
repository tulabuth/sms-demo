import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { CgUsers } from '@app/common/entities/CgUsers';
import { CgCustomers } from '@app/common/entities/CgCustomers';
import { CgPlans } from '@app/common/entities/CgPlans';
import { CgSubscriptions } from '@app/common/entities/CgSubscriptions';
import { Gateways } from '@app/common/entities/Gateways';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import { Deposits } from '@app/common/entities/CgDeposits';
export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    replication: {
      master: {
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
      slaves: [
        {
          host: process.env.DB_HOST_READ,
          port: 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
      ],
    },
    entities: [      
      CgUsers,
      CgCustomers,
      CgPlans,
      CgSubscriptions,
      Gateways,GatewayCurrencies,
      Deposits,
    ],
    timezone: '+07:00',
    synchronize: true,
  }),
);
