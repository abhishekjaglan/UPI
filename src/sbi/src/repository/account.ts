import { Prisma, PrismaClient } from "@prisma/client";
import { Account, User } from "../types/accountTypes";
import { isPrismaError } from "../middlewares/error.middleware";
import { prismaError } from "prisma-better-errors";
const logger = require('../logger/index');
// const prisma = new PrismaClient();

export class AccountRepositry{

    constructor(private prisma:  PrismaClient){}
    
    public async createAccount(userData:User):Promise<Account>{
        try {

            let email = userData.email.split('@')[0];
            
            const user = await this.prisma.account.create({
                data: {
                    name:   userData.name,
                    email:  userData.email,
                    phone:  userData.phone,
                    vpa:    `${email}@oksbi`
                }
            });

            return user;

        } catch (error: any) {
            if(isPrismaError(error)){
                throw new prismaError(error)
            }
            throw new Error(error);
        }
    }

    public async getAccount(id:Number){
        
    }

}