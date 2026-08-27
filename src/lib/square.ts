import { SquareClient, SquareEnvironment } from 'square';

export type SquareEnvironmentName = 'sandbox' | 'production';

export type SquareEnvironmentSource = {
  SQUARE_ACCESS_TOKEN?: string;
  SQUARE_LOCATION_ID?: string;
  SQUARE_ENVIRONMENT?: string;
  PUBLIC_ORDERING_ENABLED?: string;
};

export type SquareConfig = {
  token: string;
  locationId: string;
  environmentName: SquareEnvironmentName;
  environment: (typeof SquareEnvironment)[keyof typeof SquareEnvironment];
};

const buildEnvironment: SquareEnvironmentSource = {
  SQUARE_ACCESS_TOKEN: import.meta.env.SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID: import.meta.env.SQUARE_LOCATION_ID,
  SQUARE_ENVIRONMENT: import.meta.env.SQUARE_ENVIRONMENT,
  PUBLIC_ORDERING_ENABLED: import.meta.env.PUBLIC_ORDERING_ENABLED,
};

export function isOrderingEnabled(
  source: SquareEnvironmentSource = buildEnvironment,
): boolean {
  return source.PUBLIC_ORDERING_ENABLED === 'true';
}

export function getSquareConfig(
  source: SquareEnvironmentSource = buildEnvironment,
): SquareConfig | null {
  const token = source.SQUARE_ACCESS_TOKEN?.trim() ?? '';
  const locationId = source.SQUARE_LOCATION_ID?.trim() ?? '';
  const environmentName = source.SQUARE_ENVIRONMENT?.trim() ?? '';
  const missing: string[] = [];

  if (!token) {
    missing.push('SQUARE_ACCESS_TOKEN');
  }

  if (!locationId) {
    missing.push('SQUARE_LOCATION_ID');
  }

  if (!environmentName) {
    missing.push('SQUARE_ENVIRONMENT');
  }

  if (missing.length > 0) {
    if (isOrderingEnabled(source)) {
      throw new Error(
        `Square ordering is enabled, but these server variables are missing: ${missing.join(', ')}.`,
      );
    }

    return null;
  }

  if (environmentName !== 'sandbox' && environmentName !== 'production') {
    if (isOrderingEnabled(source)) {
      throw new Error('SQUARE_ENVIRONMENT must be sandbox or production.');
    }

    return null;
  }

  return {
    token,
    locationId,
    environmentName,
    environment:
      environmentName === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  };
}

export function createSquareClient(
  source: SquareEnvironmentSource = buildEnvironment,
): SquareClient | null {
  const config = getSquareConfig(source);

  if (!config) {
    return null;
  }

  return new SquareClient({
    token: config.token,
    environment: config.environment,
  });
}
