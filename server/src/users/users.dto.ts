import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class UserDto {

  @ApiProperty({ example: 'Yasser' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'Abdelkader' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
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
