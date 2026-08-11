import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    // JwtModule.register({
    //   global: true,
    //   secret: 'Sekret_Key',
    //   signOptions: { expiresIn: '24h' },
    // })
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.JWT_SECRET ?? 'Sekret_Key',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
