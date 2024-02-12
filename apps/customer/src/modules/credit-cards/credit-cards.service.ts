import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { createCreditCardDto } from './dto/create-credit-card.dto';

@Injectable()
export class CreditCardsService {
  private readonly stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async checkCreditCardValidity(cardNumber: createCreditCardDto): Promise<boolean> {
    try {
      const { number, expMonth, expYear, cvc } = cardNumber;
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
      });

      // If the payment method creation is successful, the card details are valid
      return !!paymentMethod;
    } catch (error) {
      console.error('Error verifying credit card:', error);
      return false;
    }
  }
  


  findAll() {
    return `This action returns all creditCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCard`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} creditCard`;
  }

  async checkCardUsage(cardNumber: string): Promise<boolean> {
    try {
      const card = await this.stripe.paymentMethods.retrieve(cardNumber);

      if (card) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking card usage:', error);
      throw error;
    }
  }
}
