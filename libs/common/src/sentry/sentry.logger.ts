import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Injectable({ scope: Scope.TRANSIENT })
export class SentryLogger extends ConsoleLogger {
  // use for log data in sentry only
  verbose(message: any, stack?: string, context?: string) {
    Sentry.captureMessage(message, { level: 'info', extra: { stack } });
    context ? super.verbose(message, context) : super.verbose(message, stack);
  }

  log(message: any, stack?: string, context?: string): void {
    context ? super.log(message, stack, context) : super.log(message, stack);
  }

  debug(message: any, stack?: string, context?: string) {
    Sentry.captureMessage(message, { level: 'debug', extra: { stack } });
    context
      ? super.debug(message, stack, context)
      : super.debug(message, stack);
  }
  error(message: any, stack?: string, context?: string) {
    Sentry.captureMessage(message, { level: 'error', extra: { stack } });
    context
      ? super.error(message, stack, context)
      : super.error(message, stack);
  }
  warn(message: any, stack?: string, context?: string) {
    Sentry.captureMessage(message, { level: 'warning', extra: { stack } });
    context ? super.warn(message, stack, context) : super.warn(message, stack);
  }
}
