import { IsEmail, IsNotEmpty } from 'class-validator'

export class EmailDto {
  @IsEmail()
  to: string

  @IsNotEmpty()
  subject: string

  @IsNotEmpty()
  text: string
}
