import { IsEmail, MinLength } from 'class-validator';

export class registerDto {
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Please Enter valid email!' })
  email: string;

  @MinLength(4)
  password: string;
}
