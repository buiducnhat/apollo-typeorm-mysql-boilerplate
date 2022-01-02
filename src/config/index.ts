import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV !== 'production') {
  // This error should crash whole process
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  /**
   * Server config
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Database config
   */
  orm: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    testDatabase: process.env.DB_TEST_NAME,
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
