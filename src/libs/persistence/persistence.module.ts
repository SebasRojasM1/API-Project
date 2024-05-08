import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigType } from "@nestjs/config";
import  dbConfig  from "./db.config";
import { businessSchema, userSchema } from "src/module/entities";
import { userModel, BusinessModel } from "src/module/entities";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({

            useFactory: (configService: ConfigType<typeof dbConfig>) => {
                
                try{
                    const { db, env } = configService;

                    console.log(db.password)
                    console.log(db.user);
                    //CONEXIÓN
                    const uriDb = env === 'local' ? `${db.connection}localhost:27017`: 
                    `mongodb+srv://${db.user}:${db.password}@${db.name}.${db.net}/?retryWrites=true&w=majority&appName=${db.name}`;
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