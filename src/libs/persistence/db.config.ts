import * as dotenv from 'dotenv'
import {registerAs} from '@nestjs/config'
dotenv.config()


export default registerAs('dbConfig', () => {

    const dbConfig = {
        db: {
            connection: process.env.DB_CONNECTION,
            host: process.env.DB_HOST,
            name: process.env.DB_NAME,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            local: process.env.DB_LOCALCONNECTION,
            srv: process.env.DB_CONNECTIONSRV
        },

        env: process.env.NODE_ENV || 'local',
    };

    return dbConfig;

})



    






