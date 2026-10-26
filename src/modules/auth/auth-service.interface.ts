import { LoginInDto } from "./dto/login-in-dto.js";
import { LoginOutDto } from "./dto/login-out-dto.js";
import { RegisterInDto } from "./dto/register-in-dto.js";
import { RegisterOutDto } from "./dto/register-out-dto.js";

export interface AuthServiceInterface {
    register(registerInDto: RegisterInDto): Promise<RegisterOutDto>;
    login(loginInDto: LoginInDto): Promise<LoginOutDto>;
}