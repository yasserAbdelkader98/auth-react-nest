import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './users.schema';

describe('UsersService', () => {
  let service: UsersService;
  let save: jest.Mock<Promise<unknown>, [unknown]>;
  let constructedData: { password: string } | undefined;
  let userModel: jest.Mock & {
    findOne: jest.Mock;
    findByIdAndDelete: jest.Mock;
  };

  beforeEach(async () => {
    save = jest.fn<Promise<unknown>, [unknown]>();
    constructedData = undefined;
    userModel = Object.assign(
      jest.fn().mockImplementation((data: { password: string }) => {
        constructedData = data;
        return { save: () => save(data) };
      }),
      {
        findOne: jest.fn(),
        findByIdAndDelete: jest.fn(),
      },
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('hashes the password and excludes it from a registration response', async () => {
    save.mockImplementation((data: unknown) => {
      const savedUser = data as { password: string };
      return Promise.resolve({
        toObject: () => ({
          _id: 'user-id',
          firstName: 'Test',
          lastName: 'User',
          email: 'user@example.com',
          password: savedUser.password,
        }),
      });
    });

    const result = await service.register({
      firstName: 'Test',
      lastName: 'User',
      email: 'user@example.com',
      password: 'Test&123',
    });

    expect(userModel).toHaveBeenCalledTimes(1);
    expect(constructedData).toBeDefined();
    expect(constructedData?.password).not.toBe('Test&123');
    expect(await compare('Test&123', constructedData?.password ?? '')).toBe(
      true,
    );
    expect(result).not.toHaveProperty('password');
  });

  it('converts MongoDB duplicate-key errors into a conflict response', async () => {
    save.mockRejectedValue({ code: 11000 });

    await expect(
      service.register({
        firstName: 'Test',
        lastName: 'User',
        email: 'user@example.com',
        password: 'Test&123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('rethrows unexpected database errors', async () => {
    const databaseError = new Error('Database unavailable');
    save.mockRejectedValue(databaseError);

    await expect(
      service.register({
        firstName: 'Test',
        lastName: 'User',
        email: 'user@example.com',
        password: 'Test&123',
      }),
    ).rejects.toBe(databaseError);
  });

  it('looks up a user by email', async () => {
    const lean = jest.fn().mockResolvedValue({ email: 'user@example.com' });
    userModel.findOne.mockReturnValue({ lean });

    await expect(service.findByEmail('user@example.com')).resolves.toEqual({
      email: 'user@example.com',
    });
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: 'user@example.com',
    });
    expect(lean).toHaveBeenCalled();
  });

  it('deletes an existing account', async () => {
    userModel.findByIdAndDelete.mockResolvedValue({ _id: 'user-id' });

    await expect(service.deleteMyAccount('user-id')).resolves.toEqual({
      message: 'Account deleted successfully',
    });
    expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('user-id');
  });

  it('returns not found when deleting a missing account', async () => {
    userModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.deleteMyAccount('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
