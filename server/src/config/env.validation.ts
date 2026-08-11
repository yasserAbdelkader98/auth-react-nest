const REQUIRED_JWT_SECRET_LENGTH = 32;

export function validateEnvironment(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const errors: string[] = [];
  const port = Number(config.PORT ?? 3000);
  const dbUrl = readString(config.DB_URL);
  const frontendUrl = readString(config.FRONTEND_URL);
  const jwtSecret = readString(config.JWT_SECRET);
  const nodeEnv = readString(config.NODE_ENV) || 'development';

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    errors.push('PORT must be an integer between 1 and 65535');
  }

  if (!dbUrl || !/^mongodb(?:\+srv)?:\/\//.test(dbUrl)) {
    errors.push('DB_URL must be a valid MongoDB connection string');
  }

  if (!isHttpUrl(frontendUrl)) {
    errors.push('FRONTEND_URL must be a valid http or https URL');
  }

  if (!jwtSecret || jwtSecret.length < REQUIRED_JWT_SECRET_LENGTH) {
    errors.push(
      `JWT_SECRET must contain at least ${REQUIRED_JWT_SECRET_LENGTH} characters`,
    );
  }

  if (!['development', 'test', 'production'].includes(nodeEnv)) {
    errors.push('NODE_ENV must be development, test, or production');
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid environment configuration:\n- ${errors.join('\n- ')}`,
    );
  }

  return {
    ...config,
    PORT: port,
    DB_URL: dbUrl,
    FRONTEND_URL: frontendUrl,
    JWT_SECRET: jwtSecret,
    NODE_ENV: nodeEnv,
  };
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
