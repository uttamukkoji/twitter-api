import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredentialsDto {
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @IsString()
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: 'Password is too weak.'
        }
    )
    password: string;
}