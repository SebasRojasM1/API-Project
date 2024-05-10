/* eslint-disable prettier/prettier */
import { Global, Module, OnModuleInit } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigType } from "@nestjs/config";
import  dbConfig  from "./db.config";
import mongoose from "mongoose";
import { businessSchema} from "../../module/business/entities/business.entity";
import { userSchema } from "../../module/users/entities/users.entities";
@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'users', schema: userSchema},
            {name: 'business', schema: businessSchema}
        ]),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof dbConfig>) => {
                const { db, env } = configService;
                const uriDb = env === 'local' ? `${db.connection}localhost:27017`: 
                `mongodb+srv://${db.user}:${db.password}@${db.name}.${db.net}/?retryWrites=true&w=majority&appName=${db.name}`;
                
                return {
                    uri: uriDb
                }
            },
            inject: [dbConfig.KEY]
        })
    ],
})
export class PersistenceModule implements OnModuleInit{

    onModuleInit() {
         this.checkDatabaseConnection();
      }
    
       private async checkDatabaseConnection() {
        const db = mongoose.connection;

        if(db.readyState === 1){
            console.log("Connected to MongoDB");
        } else {
            db.on('error', () => {console.log("Error")});
            db.once('open', () => {
                console.log("Connected to MongoDB")
            });
        }
        
    }
}