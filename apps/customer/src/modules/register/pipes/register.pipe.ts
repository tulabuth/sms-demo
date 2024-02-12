import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

import { RegisterDto } from '../dto/register.dto';
import { RegisterService } from '../register.service';

@Injectable()
export class RegisterPipe implements PipeTransform {
  @Inject() private registerService: RegisterService;

  private readonly logger: Logger = new Logger(RegisterPipe.name);

  async transform(body: RegisterDto) {
    
    const { email, phone, password, confirmPassword } = body;

    const pattern =
      /^[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\^~`]+[0-9A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\^~`]*$/g;
    const isValid = !!password.match(pattern);
    if (!isValid) {
      this.logger.error(
        `รหัสผ่านตัองประกอบด้วยตัวเลขหรือตัวอักษร A-Z ทั้งตัวพิมพ์ใหญ่และเล็ก หรือสัญลักษณ์พิเศษ และห้ามมีช่องว่าง`,
      );
      throw new BadRequestException(
        'รหัสผ่านตัองประกอบด้วยตัวเลขหรือตัวอักษร A-Z ทั้งตัวพิมพ์ใหญ่และเล็ก หรือสัญลักษณ์พิเศษ และห้ามมีช่องว่าง',
      );
    }

    if (password !== confirmPassword) {
      this.logger.error('รหัสผ่านไม่ตรงกัน');
      throw new BadRequestException('รหัสผ่านไม่ตรงกัน');
    }

    let isEmailExist: boolean;
    try {
      isEmailExist = await this.registerService.isEmailExist(email);
    } catch (e) {
      this.logger.error(`get isEmailExist() error:${e.message ?? e}`);
      throw new BadRequestException(e.message ?? e);
    }

    if (isEmailExist) {
      this.logger.error('อีเมลนี้ถูกใช้งานแล้ว');
      throw new BadRequestException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    let isPhoneExist: boolean;
    try {
      isPhoneExist = await this.registerService.isPhoneExist(phone);
    } catch (e) {
      this.logger.error(`get isPhoneExist() error:${e.message ?? e}`);
      throw new BadRequestException(e.message ?? e);
    }

    if (isPhoneExist) {
      this.logger.error('หมายเลขโทรศัพท์นี้ถูกใช้งานแล้ว');
      throw new BadRequestException('หมายเลขโทรศัพท์นี้ถูกใช้งานแล้ว');
    }

    return body;
  }
}
