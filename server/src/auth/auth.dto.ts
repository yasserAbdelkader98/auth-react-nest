import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { normalizeEmail } from '../common/string-transformers';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @Transform((params: TransformFnParams) =>
    normalizeEmail(params.value as unknown),
  )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test&123' })
  @IsNotEmpty()
  password: string;
}
