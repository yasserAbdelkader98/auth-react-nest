import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleDestroy,
} from '@nestjs/common';

type AttemptRecord = {
  count: number;
  expiresAt: number;
};

@Injectable()
export class RateLimitService implements OnModuleDestroy {
  private readonly windowMs = 15 * 60 * 1000;
  private readonly maxFailedLogins = 3;
  private readonly maxRegistrations = 5;
  private readonly failedLogins = new Map<string, AttemptRecord>();
  private readonly registrations = new Map<string, AttemptRecord>();
  private readonly cleanupTimer = setInterval(
    () => this.removeExpiredRecords(),
    60 * 1000,
  );

  constructor() {
    this.cleanupTimer.unref();
  }

  assertLoginAllowed(email: string, ip: string): void {
    const record = this.getActiveRecord(this.failedLogins, this.loginKey(email, ip));

    if (record && record.count >= this.maxFailedLogins) {
      this.throwTooManyRequests(
        'Too many failed login attempts. Please try again in 15 minutes.',
        record.expiresAt,
      );
    }
  }

  recordFailedLogin(email: string, ip: string): void {
    this.increment(this.failedLogins, this.loginKey(email, ip));
  }

  resetFailedLogins(email: string, ip: string): void {
    this.failedLogins.delete(this.loginKey(email, ip));
  }

  recordRegistrationAttempt(ip: string): void {
    const record = this.getActiveRecord(this.registrations, ip);

    if (record && record.count >= this.maxRegistrations) {
      this.throwTooManyRequests(
        'Too many registration attempts. Please try again in 15 minutes.',
        record.expiresAt,
      );
    }

    this.increment(this.registrations, ip);
  }

  onModuleDestroy(): void {
    clearInterval(this.cleanupTimer);
  }

  private loginKey(email: string, ip: string): string {
    return `${email.toLowerCase()}:${ip}`;
  }

  private increment(store: Map<string, AttemptRecord>, key: string): void {
    const record = this.getActiveRecord(store, key);

    if (record) {
      record.count += 1;
      return;
    }

    store.set(key, {
      count: 1,
      expiresAt: Date.now() + this.windowMs,
    });
  }

  private getActiveRecord(
    store: Map<string, AttemptRecord>,
    key: string,
  ): AttemptRecord | undefined {
    const record = store.get(key);

    if (record && record.expiresAt <= Date.now()) {
      store.delete(key);
      return undefined;
    }

    return record;
  }

  private removeExpiredRecords(): void {
    const now = Date.now();

    for (const store of [this.failedLogins, this.registrations]) {
      for (const [key, record] of store) {
        if (record.expiresAt <= now) {
          store.delete(key);
        }
      }
    }
  }

  private throwTooManyRequests(message: string, expiresAt: number): never {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message,
        retryAfterSeconds: Math.max(1, Math.ceil((expiresAt - Date.now()) / 1000)),
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
