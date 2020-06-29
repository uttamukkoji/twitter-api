import { Controller, Body, Post, ValidationPipe, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private logger: Logger) {
        this.logger.setContext('AuthController');
    }
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto) {
        this.logger.log(`User Signup "${authcredentialsDto.username}"`)
        return this.authService.signUp(authcredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto) {
        this.logger.log(`User Sign in "${authcredentialsDto.username}"`)
        return this.authService.signIn(authcredentialsDto);
    }
}
