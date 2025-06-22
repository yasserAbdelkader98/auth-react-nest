import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Transform(({ value }) => value?.trim()?.toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
