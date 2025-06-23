import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({ example: 'user@example.com' })
    @Transform(({ value }) => value?.trim()?.toLowerCase())
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Test&123' })
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()
    password: string;
}
