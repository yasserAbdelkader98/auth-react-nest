import { validateEnvironment } from './env.validation';

const validConfig = {
  PORT: '3000',
  DB_URL: 'mongodb://localhost:27017/auth-app',
  FRONTEND_URL: 'http://localhost:5173',
  JWT_SECRET: 'a-secure-test-secret-with-32-characters',
  NODE_ENV: 'test',
};

describe('validateEnvironment', () => {
  it('normalizes a valid configuration', () => {
    expect(validateEnvironment(validConfig)).toMatchObject({
      ...validConfig,
      PORT: 3000,
    });
  });

  it('rejects a missing JWT secret', () => {
    expect(() =>
      validateEnvironment({ ...validConfig, JWT_SECRET: undefined }),
    ).toThrow('JWT_SECRET must contain at least 32 characters');
  });

  it('reports multiple invalid values together', () => {
    expect(() =>
      validateEnvironment({
        ...validConfig,
        PORT: 'invalid',
        DB_URL: 'not-mongodb',
        FRONTEND_URL: 'not-a-url',
      }),
    ).toThrow(
      /PORT must be an integer[\s\S]*DB_URL must be a valid[\s\S]*FRONTEND_URL must be a valid/,
    );
  });
});
