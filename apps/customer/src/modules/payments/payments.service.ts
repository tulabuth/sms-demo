import { Deposits } from '@app/common/entities/CgDeposits';
import { CgUsers } from '@app/common/entities/CgUsers';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserIdDto } from '../account/dto/user-id-dto';
import { dayjsTz } from '@app/common/utils/dayjs';
import { GbprimaryService } from './gbprimary/gbprimary.service';
import { Gateways } from '@app/common/entities/Gateways';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(GatewayCurrencies)
    private readonly gatewayCurrencyRepository: Repository<GatewayCurrencies>,
    @InjectRepository(Deposits)
    private readonly depositRepository: Repository<Deposits>,
    @InjectRepository(CgUsers)
    private readonly userRepository: Repository<CgUsers>,
    @InjectRepository(Gateways)
    private readonly gatewayRepository: Repository<Gateways>,
    private readonly gbprimpayService: GbprimaryService,
  ) {}

  async makePayment(createPaymentDto: CreatePaymentDto, user: UserIdDto) {
    //const now = dayjsTz();
    
    const gate = await this.gatewayCurrencyRepository.findOne({
      where: {
        method_code: createPaymentDto.method_code,
        currency: createPaymentDto.currency,
      },
    });

    if (!gate) {
      throw new NotFoundException('Invalid gateway');
    }

    if (Number(gate.minAmount) > Number(createPaymentDto.amount) || Number(gate.maxAmount) < Number(createPaymentDto.amount)) {
      throw new BadRequestException('Please follow deposit limit');
    }

    const charge = Number(gate.fixedCharge) + (Number(createPaymentDto.amount) * Number(gate.percentCharge) / 100);
    const payable = Number(createPaymentDto.amount) + Number(charge);
    const final_amo = Number(payable) * Number(gate.rate);
    const deposit = new Deposits();
    deposit.userId = user.id;
    deposit.gatewayCurrencyId = Number(gate.id);
    deposit.methodCurrency = gate.currency.toUpperCase();
    deposit.amount = Number(createPaymentDto.amount);
    deposit.charge = charge;
    deposit.rate = gate.rate;
    deposit.finalAmo = final_amo;
    deposit.btcAmo = 0;
    deposit.btcWallet ="",
    deposit.trx = this.generateTrx();
    //deposit.createdAt = now.toDate();
    //deposit.updatedAt = now.toDate();

    let result = await this.depositRepository.save<Deposits>(deposit);
    try {
      let res = await this.depositRepository.findOneOrFail({ relations: ['gatewayCurrency'], where: { id: result.id }})
      
      if (res) {
        return await this.findGateway(res, gate.method_code)
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Not save Deposit');
    }
  }
  generateTrx(length: number = 12): string {
    const characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ123456789';
    const charactersLength = characters.length;
    let randomString = '';

    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * charactersLength)];
    }

    return randomString;
  }

  async findGateway(deposit: Deposits, methodCode: number) {
    
    let res;
    switch (methodCode) {
      case 78:
        res = await this.gbprimpayService.procress(deposit);
        return res;
        break;

      default:
        break;
    }
  }

  async findOne(methodCode: number, user: UserIdDto) {
    let whilelistCode = [79];
    if (!whilelistCode.includes(methodCode)) {
      throw new NotFoundException('Invalid gateway');
    }
    const gateway = await this.gatewayRepository.findOne({
      where: { code: methodCode },
    });

    if (!gateway) {
      throw new NotFoundException('Invalid gateway');
    }
    let gatewayParameters = gateway.gatewayParameters;
    gatewayParameters = JSON.parse(gatewayParameters);

    return {
      data: gatewayParameters,
      isSuccess: true,
    };
  }
  findAll() {
    return `This action returns all payments`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
