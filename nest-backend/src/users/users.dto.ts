import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {

  @ApiProperty({ example: 'Yasser' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Abdelkader' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user@example.com' })
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test&123' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
