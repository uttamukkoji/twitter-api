import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { UserModel } from './models/user.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
export class AuthService {
    constructor(
        @InjectModel('UserModel') private readonly userModel: Model<UserModel>,
        private jwtService: JwtService,
        private logger: Logger,
        ) {
            this.logger.setContext('AuthService')
        }

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        const userModel = new this.userModel();
        userModel.username = username
        userModel.salt = await bcrypt.genSalt()
        userModel.password = await this.hash(password, userModel.salt);

        try {
            const signUpResult = await userModel.save();
        }catch (error) {
            this.logger.error(`User Signup ${authCredentialsDto.username}.`, error.stack);
            if (error.code === 11000) {
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const username = await this.validateUserPass(authCredentialsDto);
        if (!username) {
            this.logger.error(`User Sign In ${authCredentialsDto.username}. Invalid credentials`);
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    async validateUserPass(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ username });

        if (user && (await this.hash(password, user.salt) === user.password)) {
            return user.username
        } else {
            return null
        }
    }

    async hash(password, salt): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
