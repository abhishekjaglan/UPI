import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../types/accountTypes";
const logger = require('../logger/index');
// const prisma = new PrismaClient();

export class AccountRepositry{

    constructor(private prisma:  PrismaClient){}
    
    public async createUser (userData:User){
        try {
            
            // await this.prisma.account.create({
                
            // }) 

        } catch (error: unknown) {
            if( error instanceof Prisma.PrismaClientUnknownRequestError){
                logger.error(`Database error: ${error.message}`);
            }else if(error instanceof Prisma.PrismaClientValidationError){
                logger.error(`Prisma Validation error : ${error.message}`);
            }else if(error instanceof Error){
                logger.error(`Error occured while creating the account: ${error.message}`);
            }else{
                logger.error(`Unexpected error occured`);
            }            
        }
    }

}