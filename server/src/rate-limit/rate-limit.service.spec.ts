import { HttpException } from '@nestjs/common';
import { RateLimitService } from './rate-limit.service';

describe('RateLimitService', () => {
  let service: RateLimitService;

  beforeEach(() => {
    service = new RateLimitService();
  });

  afterEach(() => {
    service.onModuleDestroy();
  });

  it('blocks the fourth login attempt after three failures', () => {
    const email = 'user@example.com';
    const ip = '127.0.0.1';

    for (let attempt = 0; attempt < 3; attempt += 1) {
      service.assertLoginAllowed(email, ip);
      service.recordFailedLogin(email, ip);
    }

    expect(() => service.assertLoginAllowed(email, ip)).toThrow(HttpException);
  });

  it('resets failed attempts after a successful login', () => {
    const email = 'user@example.com';
    const ip = '127.0.0.1';

    for (let attempt = 0; attempt < 3; attempt += 1) {
      service.recordFailedLogin(email, ip);
    }

    service.resetFailedLogins(email, ip);

    expect(() => service.assertLoginAllowed(email, ip)).not.toThrow();
  });

  it('blocks the sixth registration attempt from the same IP', () => {
    const ip = '127.0.0.1';

    for (let attempt = 0; attempt < 5; attempt += 1) {
      service.recordRegistrationAttempt(ip);
    }

    expect(() => service.recordRegistrationAttempt(ip)).toThrow(HttpException);
  });
});
