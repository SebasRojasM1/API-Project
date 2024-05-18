import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const now = Date.now();
    const TIMEOUT = 20000; // 20 segundos

    return next.handle().pipe(
      //Declaration of the limit time 
      timeout(TIMEOUT),

      //Action with tap
      tap(() => console.log(`Execution time: ${Date.now() - now}ms`)),
      catchError(err => {
        if (err instanceof TimeoutError) {
          console.error(`Request timed out after ${TIMEOUT}ms`);
          return throwError(new HttpException('Request timed out', HttpStatus.REQUEST_TIMEOUT));
        }

        throw err
      })
    );
  }
}