import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Resend } from 'resend'
import { EmailDto } from './dto/email.dto'

@Injectable()
export class EmailService {
  private resend: Resend
  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_TOKEN'))
  }

  async sendEmail(data: EmailDto) {
    const result = await this.resend.emails.send({
      from: this.configService.get<string>('RESEND_FROM')!,
      ...data,
    })
    if (result.error) {
      throw new InternalServerErrorException()
    }
  }
}
