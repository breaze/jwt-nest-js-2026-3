import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthServiceInterface } from './auth-service.interface.js';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity.js';
import { RoleEntity } from './entities/role.entity.js';
import bcrypt from 'bcryptjs';
import { RoleName } from './enums/role-name.enum.js';
import { RegisterInDto } from './dto/register-in-dto.js';
import { RegisterOutDto } from './dto/register-out-dto.js';
import { LoginInDto } from './dto/login-in-dto.js';
import { LoginOutDto } from './dto/login-out-dto.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
        async register(registerInDto: RegisterInDto): Promise<RegisterOutDto> {
        const { username, password } = registerInDto;
        if (!username || !password) {
            throw new BadRequestException('username y password son obligatorios');
        }

        const exists = await this.userRepository.findOneBy({ username });
        if (exists) {
            throw new ConflictException(`El usuario ${username} ya existe`);
        }

        // Todo usuario nuevo nace con rol USER
        const userRole = await this.roleRepository.findOneBy({ name: RoleName.USER });
        if (!userRole) {
            throw new InternalServerErrorException('No existe el rol USER. Ejecuta el INSERT de roles.');
        }

        // Nunca guardamos la contraseña en texto plano
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            roles: [userRole],
        });
        const savedUser = await this.userRepository.save(user);

        const outDTO: RegisterOutDto = {
            id: savedUser.id,
            username: savedUser.username,
            roles: savedUser.roles.map((role) => role.name),
        };
        return outDTO;
    }
        async login(loginInDto: LoginInDto): Promise<LoginOutDto> {
        const { username, password } = loginInDto;
        if (!username || !password) {
            throw new BadRequestException('username y password son obligatorios');
        }

        const user = await this.userRepository.findOne({
            where: { username },
            relations: { roles: true },
        });

        // Mismo mensaje para "no existe" y "password incorrecto": no damos pistas
        if (!user || !user.active) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload: JwtPayload = {
            sub: user.id,
            username: user.username,
            roles: user.roles.map((role) => role.name),
        };

        const outDTO: LoginOutDto = {
            accessToken: await this.jwtService.signAsync(payload),
            tokenType: 'Bearer',
            expiresIn: Number(this.configService.getOrThrow<string>('JWT_EXPIRES_IN')),
        };
        return outDTO;
    }
}
