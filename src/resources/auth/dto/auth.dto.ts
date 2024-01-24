import { IsEmail, IsNotEmpty } from 'class-validator'
import { CreateUserDto } from '../../user/dto/create-user.dto'

export class RegisterDto extends CreateUserDto {
  @IsNotEmpty()
  code: string
}

export class LoginDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
