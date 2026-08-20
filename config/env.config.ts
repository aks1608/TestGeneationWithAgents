import * as dotenv from 'dotenv';
import * as path from 'path';

// Load a single .env file — all environments are configured inside it
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Supported environments — switch by setting ENV=local|staging|production
export type Environment = 'local' | 'staging' | 'production';

const ENV = (process.env.ENV as Environment) ?? 'local';

// Pick the right base URL based on the active environment
const BASE_URL_MAP: Record<Environment, string> = {
  local:      process.env.BASE_URL_LOCAL      ?? 'https://opensource-demo.orangehrmlive.com',
  staging:    process.env.BASE_URL_STAGING    ?? 'https://staging.orangehrmlive.com',
  production: process.env.BASE_URL_PRODUCTION ?? 'https://orangehrmlive.com',
};

export const config = {
  env: ENV,
  baseURL: BASE_URL_MAP[ENV],

  credentials: {
    admin: {
      username: process.env.ADMIN_USERNAME ?? 'Admin',
      password: process.env.ADMIN_PASSWORD ?? 'admin123',
    },
  },

  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 30000),
  expectTimeout:  Number(process.env.EXPECT_TIMEOUT  ?? 5000),
};
