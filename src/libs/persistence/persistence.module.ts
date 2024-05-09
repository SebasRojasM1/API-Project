import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigType } from "@nestjs/config";
import  dbConfig  from "./db.config";
import { userModel, BusinessModel } from "src/module/entities";
import mongoose from "mongoose";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'users', schema: userModel},
            {name: 'business', schema: BusinessModel}
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
export class PersistenceModule{

    constructor() {
        this.checkDatabaseConnection();
      }
    
      private checkDatabaseConnection() {
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
          console.log("Connected to MongoDB");
        });
    }
}