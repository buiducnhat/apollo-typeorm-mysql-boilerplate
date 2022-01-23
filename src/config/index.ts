import * as dotenv from 'dotenv';
import { Algorithm as IJWTAlgorithm } from 'jsonwebtoken';

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
  host: process.env.HOST,
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

  /**
   * Your secret sauce
   */
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: 'HS256' as IJWTAlgorithm,
    jwtExpireTimeNormal: process.env.JWT_EXPIRE_NORMAL,
    jwtExpireTimeLong: process.env.JWT_EXPIRE_LONG,
  },

  /**
   * Google cloud key
   */
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  /**
   * Facebook key
   */
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    secretKey: process.env.FACEBOOK_SECRET_KEY,
  },
  /**
   * Cloudinary config
   */
  cloudinary: {
    folder: process.env.CLOUDINARY_FOLDER,
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
