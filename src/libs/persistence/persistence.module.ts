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
=======
                const { db, env } = configService;
                const uriDb = env === 'local' ? `${db.connection}localhost:27017`: 
                `mongodb+srv://${db.user}:${db.password}@${db.name}.${db.net}/?retryWrites=true&w=majority&appName=${db.name}`;
                
                return {
                    uri: uriDb
>>>>>>> befe472 (Done the authentication services and controllers, and response of the persistence connection)
                }
            },
            inject: [dbConfig.KEY]
        })
    ]
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