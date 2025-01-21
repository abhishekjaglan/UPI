import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorType } from '../types/error.types';
import { prismaError } from 'prisma-better-errors';
import { Prisma } from '@prisma/client';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: ErrorType;
  public readonly isOperational: boolean;

  constructor(
    message: string, 
    statusCode: number, 
    type: ErrorType,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (
  err: Error | AppError | ZodError | prismaError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    res.status(400).json({
      type: ErrorType.VALIDATION_ERROR,
      message: 'Validation Error',
      errors: err.errors
    });
    return;
  }

  // Handle AppError instances
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      type: err.type,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle Prisma-better-errors instance
  if (err instanceof prismaError) {
    res.status(err.statusCode).json({
        title: err.title,
        name: err.name,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
    });
  }

  // Handle unknown errors
  res.status(500).json({
    type: ErrorType.INTERNAL_SERVER,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
};

export const isPrismaError = (err: Error): boolean => {
    if(err instanceof Prisma.PrismaClientInitializationError){
        return true;
    }else if(err instanceof Prisma.PrismaClientKnownRequestError){
        return true;
    }else if(err instanceof Prisma.PrismaClientRustPanicError){
        return true;
    }else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        return true;
    }else if(err instanceof Prisma.PrismaClientValidationError){
        return true;
    }else{
        return false;
    }
};