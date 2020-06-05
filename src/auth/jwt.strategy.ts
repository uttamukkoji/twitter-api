import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface.js';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './models/user.model.js';
import { Model } from 'mongoose';
import * as config from 'config';

require('dotenv').config()

const jwtConfig = config.get('jwt');

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('UserModel') private readonly userModel: Model<UserModel>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET ||jwtConfig.secret,
        })
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}