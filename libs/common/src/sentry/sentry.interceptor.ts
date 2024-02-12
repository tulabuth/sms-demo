import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable, tap } from 'rxjs';

export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        error: (exeception) => {
          const request = context.getArgByIndex(0)
          Sentry.captureException(exeception, {
            level: "error",
            extra: {
              "request" : {
                "body" : request.body,
                "params": request.params,
                "query": request.query,
                "headers": request.headers,
              },
              "response" : exeception
            }
          })
        },
      }),
    );
  }
}
