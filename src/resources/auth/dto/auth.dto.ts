import { IsNotEmpty } from 'class-validator'
import { CreateUserDto } from '../../user/dto/create-user.dto'

export class RegisterDto extends CreateUserDto {
  @IsNotEmpty()
  code: string
}
