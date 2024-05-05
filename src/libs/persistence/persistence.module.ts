import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigType } from "@nestjs/config";
import  dbConfig  from "./db.config";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({

            useFactory: (configService: ConfigType<typeof dbConfig>) => {
                
                try{
                    const {db, env} = configService; 
                    const uriDb = env === process.env.DB_ENVIRONMENT ?`${db.local}/${db.name}`
                    :`${db.srv}://${db.user}:${encodeURIComponent(db.password)}@${db.host}/${db.name}?retryWrites=true&w=majority&appName=@cluster0`;
                    return {
                        uri: uriDb
                    }
                } catch(error){
                    console.error(error)
                }
               
            },
            inject: [dbConfig.KEY]
        })
    ]
})
export class PersistenceModule{}