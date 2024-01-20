import { IsEmail, Length } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @Length(6, 18)
  password: string

  @Length(4, 20)
  nickname: string
}
