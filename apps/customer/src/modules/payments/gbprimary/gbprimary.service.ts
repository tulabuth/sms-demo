import { Deposits } from '@app/common/entities/CgDeposits';
import { Gateways } from '@app/common/entities/Gateways';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateGbprimpayDto } from './dto/create-gbprimpay.dto';
import { GatewayCurrencies } from '@app/common/entities/GatewayCurrencies';

@Injectable()
export class GbprimaryService {
  constructor(
    @InjectRepository(Gateways)
    private readonly gatewayRepository: Repository<Gateways>,
    private readonly httpService: HttpService,
    @InjectRepository(Deposits)
    private readonly depositRepository: Repository<Deposits>,
    @InjectRepository(GatewayCurrencies)
    private readonly gatewayCurrenciesRepository: Repository<GatewayCurrencies>,
  ){}
  async procress(deposit: Deposits){
    const gatewayCurr = await this.gatewayCurrenciesRepository.findOne({where: {id: deposit.gatewayCurrencyId}});
    const gateway = await this.gatewayRepository.findOne({where:{code: gatewayCurr.method_code}})
  
    const id = deposit.gatewayCurrencyId;
    const gatewayCurrency = await this.gatewayCurrenciesRepository.findOne({where: {id}})
    
    const gatewayParameter = JSON.parse(gatewayCurrency.gatewayParameter);
   
    const amount = Math.round(deposit.finalAmo * 100)/100;
    const alias = gateway.alias;
    const url = "https://api.gbprimepay.com/v3/qrcode";
    
    const response = await this.httpService.post(url,{
      token: gatewayParameter.token,
      referenceNo: Date.now().toString(),
      amount: amount,
      backgroundUrl: `${process.env.URL}/api/ipn/${alias}`,
      merchantDefined1: deposit.userId,
      merchantDefined2: gatewayParameter.api_key,
      merchantDefined3: deposit.trx,
    },{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'arraybuffer'
    }).pipe(map(response=>response)).toPromise();
    //const qrcode = response.data.qrcode;
    const encodedImage =
    'data:'+
    response.headers['content-type']+';base64,'+
    Buffer.from(response.data).toString('base64');

    return {
      data:{
        encodedImage: encodedImage,
      }
    }
  }

  async ipn(dto:CreateGbprimpayDto){
    const deposit = await this.depositRepository.createQueryBuilder('deposit').where('deposit.trx= :trx', {trx: dto.merchantDefined3}).orderBy('deposit.id', 'DESC').getOne();
    const gatewayParameter = JSON.parse(deposit.gatewayCurrency.gatewayParameter);
    if(dto.merchantDefined2 !== gatewayParameter.api_key){
      return "KEY ERROR";
    }
  }
}
