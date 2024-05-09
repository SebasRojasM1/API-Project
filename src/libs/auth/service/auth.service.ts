import { loginBusinessDto, registerBusinessDto } from "src/libs/Dtos/business";
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { loginUserDto, registerUserDto } from "src/libs/Dtos/users";
import { businessSchema, userSchema } from "src/module/entities";
import { businessService, userService } from 'src/module/service/index'
import { HashService } from "src/libs/utils/hash/service/hash.service";
import { Tokens, jwtPayload } from "src/libs/types";
import * as bcrypt from 'bcryptjs'
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";


export class authService {

    constructor(

        private UserService: userService, 
        private BusinessService: businessService, 
        private hashService: HashService, 
        private jwtService: JwtService,

        @InjectModel(businessSchema.name) private businessModel: Model<businessSchema>, 
        @InjectModel(userSchema.name) private userModel: Model<userSchema> 
    
    ){}

    async registerBusiness(RegisterBusinessDto: registerBusinessDto): Promise<registerBusinessDto>{

        try {
            const validation = await this.validationExistenceEmailBusiness(RegisterBusinessDto.email)

            if(!validation){
                throw new BadRequestException('Email has already exists please try with other email')
            }
    
                const {password} = RegisterBusinessDto
    
                const newBusiness = ({...RegisterBusinessDto, password: await bcrypt.hash(password, 10)})
    
                const newBusinessWithModel = new this.businessModel(newBusiness)
                
                return await this.BusinessService.create(newBusinessWithModel) 
        } catch(error){
            console.error(`Error with the business register ${error}`)
        }
       
    
    }

    async loginBusiness({email, password}: loginBusinessDto): Promise<Tokens>{


        try{

            const businessFind = await this.BusinessService.findOneByEmail(email)

            if(!businessFind){
    
                throw new Error('Email or password incorrect')
            }
    
            const businessPassword = this.BusinessService.findByPassword(password)
    
            if(!businessPassword){
                throw new Error('Email or Password incorrect')
            }
    
            return await this.getTokens({
                firm: businessFind.id
            });

        } catch(error){
            console.error(`We have the next problem with the login business ${error}`)
        }
       
    }

    async registerUser(RegisterUserDto: registerUserDto): Promise<registerUserDto>{


        try {
                const validation =  await this.validationExistenceEmailUser(RegisterUserDto.email)

                if(!validation){
                    throw new BadRequestException('Email has already exists please try with other email')
                }

                const {password} = RegisterUserDto

                const newUserDto = {
                    ...RegisterUserDto, 
                    password: await bcrypt.hash(password, 10)
                };

                const newUserWithModel = new this.userModel(newUserDto)

                return await this.UserService.create(newUserWithModel)


             } catch(error){
                console.error(`We have this problem with the user register ${error}`)
            }
       
    }

    async loginUser({email, password}: loginUserDto): Promise<Tokens>{

        try{

            const userFind = await this.UserService.findOneByEmail(email)

            if(!userFind){
                throw new BadRequestException("User not found");
            }

            const isPasswordValid = await this.hashService.compare(
                password, 
                userFind.password
            );

            if(!isPasswordValid){
                throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
            }

            return await this.getTokens({
                firm: userFind.id
            })

        } catch(error){

            console.error(`We have the next problem with the login user ${error}`)
        }
        
    }

    async getTokens(jwtPayload: jwtPayload): Promise<Tokens>{

        const secret_key = process.env.JWT_SECRETKEY;

        if(!secret_key){

            throw new Error('Jwt token is not set')
        }

        const tokenOptions = {
            expiresIn: process.env.SECRET_TOKEN_EXPIRY || '15m'
        }

        const accessToken = await this.signToken(
            jwtPayload,
            secret_key,
            tokenOptions
        )

        return {AccessToken: accessToken}
    }

    async signToken(payload: jwtPayload, secretKey:string, options:any){
        return await this.jwtService.signAsync(payload, {
            secret: secretKey,
            ...options
        })
    }

    async validationExistenceEmailUser(email: string):Promise < Boolean | undefined > {

        const validationUser = await this.UserService.findOneByEmail(email)

        if(validationUser){
            throw new BadRequestException('This email is already use please enter another email')
        }

        return true;
    }

    async validationExistenceEmailBusiness(email: string): Promise <Boolean | undefined> {
        
        const validationBusiness = await this.BusinessService.findOneByEmail(email)

        if(validationBusiness){
            throw new BadRequestException('Email has already exists please try with another email')
        }

        return true;
    }
}