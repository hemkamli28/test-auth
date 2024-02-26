import { IsEmail, MinLength } from 'class-validator';

export class loginDto {
  @IsEmail({}, { message: 'Please Enter valid email!' })
  email: string;

  @MinLength(4)
  password: string;
}
