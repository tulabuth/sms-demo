import { ValidationError } from 'class-validator';
import { IError, IErrorFields } from './interface';
import { Exclude, instanceToPlain } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CustomError implements IError {
  @Exclude()
  status: number;

  code: string;
  message: any;
  fields?: IErrorFields;
  data?: any;
  originalError?: Error;

  constructor(partial: Partial<CustomError>) {
    Object.assign(this, partial);
  }

  getCode(): string {
    return this.code;
  }

  getData(): any {
    return this.data;
  }

  getFields(): IErrorFields {
    return this.fields;
  }

  getMessage(): any {
    return this.message;
  }

  getResponse(): any {
    return instanceToPlain(this);
  }

  getOriginalError(): Error {
    return this.originalError;
  }

  getStatus(): number {
    return this.status;
  }
}

export function singleMessageClassValidator(err: ValidationError[]) {
  const constraints = err[0]?.constraints || err[0].children[0].constraints
  return new BadRequestException(constraints[Object.keys(constraints)[0]])
}