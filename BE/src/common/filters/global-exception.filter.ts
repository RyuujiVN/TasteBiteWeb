import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

interface ErrorResponsee {
  status: number;
  message: string;
  error?: any;
  stack?: any;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse: ErrorResponsee = {
      status: status,
      message: message,
    };

    if (this.configService.get('NODE_ENV') !== 'production') {
      errorResponse.error = exception.response;
      errorResponse.stack = exception.stack;
    }

    response.status(status).json(errorResponse);
  }
}
