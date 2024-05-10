import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenv.config();

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      connection: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME /*ENV: variables de entorno */,
      user: process.env.DB_USER, //archivo .env
      password: process.env.DB_PASSWORD,
      net: process.env.DB_NET,
    },

    env: process.env.NODE_ENV || 'local',
  };

  return dbConfig;
});
