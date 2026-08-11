import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: { findByEmail: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    usersService = { findByEmail: jest.fn() };
    jwtService = { signAsync: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('returns user information and a signed token for valid credentials', async () => {
    const password = 'Test&123';
    const storedPassword = await hash(password, 4);
    usersService.findByEmail.mockResolvedValue({
      _id: 'user-id',
      firstName: 'Test',
      lastName: 'User',
      email: 'user@example.com',
      password: storedPassword,
    });
    jwtService.signAsync.mockResolvedValue('signed-token');

    const result = await service.login({
      email: 'user@example.com',
      password,
    });

    expect(usersService.findByEmail).toHaveBeenCalledWith('user@example.com');
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      id: 'user-id',
      email: 'user@example.com',
    });
    expect(result.token).toBe('signed-token');
    expect(result.userInfo).not.toHaveProperty('password');
  });

  it('rejects an unknown email without signing a token', async () => {
    usersService.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({ email: 'missing@example.com', password: 'Test&123' }),
    ).rejects.toThrow(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rejects an incorrect password without signing a token', async () => {
    usersService.findByEmail.mockResolvedValue({
      _id: 'user-id',
      email: 'user@example.com',
      password: await hash('Correct&123', 4),
    });

    await expect(
      service.login({ email: 'user@example.com', password: 'Wrong&123' }),
    ).rejects.toThrow(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
