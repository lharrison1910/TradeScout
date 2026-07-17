import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthProviderType, User } from '../User/User.entity';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
  ) {}

  async generateJwt(payload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: payload.sub },
      {
        secret: this.configService.get('SECRET_KEY'),
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  async login(email: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { businesses: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const tokens = await this.generateJwt(payload);

    const response = {
      user: {
        email: user.email,
        name: user.name,
        businesses: user.businesses,
        provider: user.authProvider,
      },
      tokens,
    };

    return response;
  }

  async register(email: string, pass: string, name: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(pass, saltRounds);

    const newUser = this.userRepository.create({
      email,
      password: passwordHash,
      name,
    });

    return await this.userRepository.save(newUser);
  }

  async validateGoogleUser(googleUser: any): Promise<User> {
    // 1. Check if the user already exists by email
    let user = await this.userRepository.findOne({
      where: { email: googleUser.email },
    });

    if (user) {
      // Optional: If they previously registered locally, you can update their provider ID here
      if (!user.providerId) {
        user.providerId = googleUser.providerId;
        user.authProvider = AuthProviderType.GOOGLE;
        await this.userRepository.save(user);
      }
      return user;
    }

    // 2. If no user exists, create a new one
    const newUser = this.userRepository.create({
      email: googleUser.email,
      name: `${googleUser.firstName} ${googleUser.lastName}`,
      authProvider: AuthProviderType.GOOGLE,
      providerId: googleUser.providerId,
      termsAccepted: true, // You may want to handle this differently depending on your UX
    });

    return await this.userRepository.save(newUser);
  }

  async verifyRefreshToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('SECRET_KEY'),
      });
    } catch (error) {
      this.logger.error(
        `verifyRefreshToken: Failed to validate token - ${error}`,
      );
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
