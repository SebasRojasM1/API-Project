import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response} from "express";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

        constructor(private configService: ConfigService){}
        catch(exception: HttpException, host: ArgumentsHost){
            
            /*Change the argumentsHost to HttpArgumentsHost for specify that the context is HTTP
            cause the argumentHost can receive a lot of contexts*/
            const ctx = host.switchToHttp(); //(Specific abstraction for treat with the Http contexts)
            //Receive the express response for that we can manage it
            const response = ctx.getResponse<Response>();
            //Receive the express request for that we can manage it
            const request = ctx.getRequest<Request>();
            const isProduction = this.configService.get<String>('PROCESS') === 'production';
            const message = exception instanceof HttpException ? 
            exception.getResponse() : 'Internal Server Error';
            /*Receive the code of the HttpException */
            const status = exception instanceof HttpException ? 
            exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        
            //Excepciones
            response.status(status).json(isProduction ? 
                {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: message,
                    detailedMessage: exception.message
                }
                :
                {
                    statusCode: status,
                    //Add TimeStamp
                    timestamp: new Date().toISOString(),
                    //Add the path of the request url for know whats the URL with the exception
                    path: request.url,
                    stacktrace: exception.stack,
                    //Add the message code of exception in the message 
                    message: message,
                    detailedMessage: exception.message
            })
    }
}