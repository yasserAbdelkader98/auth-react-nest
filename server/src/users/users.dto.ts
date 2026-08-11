import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { normalizeEmail, trimString } from '../common/string-transformers';

export class UserDto {
  @ApiProperty({ example: 'Yasser' })
  @Transform((params: TransformFnParams) => trimString(params.value as unknown))
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'Abdelkader' })
  @Transform((params: TransformFnParams) => trimString(params.value as unknown))
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @ApiProperty({ example: 'user@example.com' })
  @Transform((params: TransformFnParams) =>
    normalizeEmail(params.value as unknown),
  )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test&123' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
