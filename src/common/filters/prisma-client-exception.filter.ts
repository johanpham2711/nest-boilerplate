import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { EPrismaErrorCode } from 'src/enums';
import { PRISMA_ERRORS } from 'src/messages';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { code } = exception;
    let status;
    let message;

    const errors = exception.message.replace(/\n/g, '');
    console.error(errors);
    switch (code) {
      case EPrismaErrorCode.P2000:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.VALUE_TOO_LONG;
        break;
      case EPrismaErrorCode.P2001:
        status = HttpStatus.NOT_FOUND;
        message = PRISMA_ERRORS.RECORD_NOT_FOUND;
        break;
      case EPrismaErrorCode.P2002:
        status = HttpStatus.CONFLICT;
        message = PRISMA_ERRORS.UNIQUE_CONSTRAINT_FAILED;
        break;
      case EPrismaErrorCode.P2003:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.FOREIGN_KEY_CONSTRAINT_FAILED;
        break;
      case EPrismaErrorCode.P2004:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.CONSTRAINT_FAILED;
        break;
      case EPrismaErrorCode.P2005:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.INVALID_VALUE;
        break;
      case EPrismaErrorCode.P2006:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.INVALID_PROVIDED_VALUE;
        break;
      case EPrismaErrorCode.P2007:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.DATA_VALIDATION_ERROR;
        break;
      case EPrismaErrorCode.P2008:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.QUERY_PARSE_FAILED;
        break;
      case EPrismaErrorCode.P2009:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.QUERY_VALIDATION_FAILED;
        break;
      case EPrismaErrorCode.P2010:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.RAW_QUERY_FAILED;
        break;
      case EPrismaErrorCode.P2011:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.NULL_CONSTRAINT_FAILED;
        break;
      case EPrismaErrorCode.P2012:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.MISSING_REQUIRED_VALUE;
        break;
      case EPrismaErrorCode.P2013:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.MISSING_REQUIRED_ARGUMENT;
        break;
      case EPrismaErrorCode.P2014:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.RELATION_VIOLATION;
        break;
      case EPrismaErrorCode.P2015:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.RELATED_RECORD_NOT_FOUND;
        break;
      case EPrismaErrorCode.P2016:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.QUERY_INTERPRETATION_ERROR;
        break;
      case EPrismaErrorCode.P2017:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.RELATION_NOT_CONNECTED;
        break;
      case EPrismaErrorCode.P2018:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.CONNECTED_RECORDS_NOT_FOUND;
        break;
      case EPrismaErrorCode.P2019:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.INPUT_ERROR;
        break;
      case EPrismaErrorCode.P2020:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.VALUE_OUT_OF_RANGE;
        break;
      case EPrismaErrorCode.P2021:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.TABLE_NOT_FOUND;
        break;
      case EPrismaErrorCode.P2022:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.COLUMN_NOT_FOUND;
        break;
      case EPrismaErrorCode.P2023:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.INCONSISTENT_COLUMN_DATA;
        break;
      case EPrismaErrorCode.P2024:
        status = HttpStatus.REQUEST_TIMEOUT;
        message = PRISMA_ERRORS.CONNECTION_POOL_TIMEOUT;
        break;
      case EPrismaErrorCode.P2025:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.OPERATION_FAILED;
        break;
      case EPrismaErrorCode.P2026:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.UNSUPPORTED_FEATURE;
        break;
      case EPrismaErrorCode.P2027:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.MULTIPLE_ERRORS;
        break;
      case EPrismaErrorCode.P2028:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.TRANSACTION_API_ERROR;
        break;
      case EPrismaErrorCode.P2029:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.QUERY_PARAMETER_LIMIT_EXCEEDED;
        break;
      case EPrismaErrorCode.P2030:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.FULLTEXT_INDEX_NOT_FOUND;
        break;
      case EPrismaErrorCode.P2031:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.MONGODB_REPLICA_SET_REQUIRED;
        break;
      case EPrismaErrorCode.P2033:
        status = HttpStatus.BAD_REQUEST;
        message = PRISMA_ERRORS.NUMBER_OUT_OF_RANGE;
        break;
      case EPrismaErrorCode.P2034:
        status = HttpStatus.CONFLICT;
        message = PRISMA_ERRORS.WRITE_CONFLICT;
        break;
      case EPrismaErrorCode.P2035:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.ASSERTION_VIOLATION;
        break;
      case EPrismaErrorCode.P2036:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.EXTERNAL_CONNECTOR_ERROR;
        break;
      case EPrismaErrorCode.P2037:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = PRISMA_ERRORS.TOO_MANY_CONNECTIONS;
        break;
      default:
        // Use the base exception filter to handle other unrecognized errors
        super.catch(exception, host);
        return;
    }

    response.status(status).json({
      success: false,
      message,
      //   errors: exception.message.replace(/\n/g, ''),
      code: status,
    });
  }
}
