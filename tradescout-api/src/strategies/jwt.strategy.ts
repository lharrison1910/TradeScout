import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('SECRET_KEY');
    if (!secret) {
      throw new Error('SECRET_KEY must be defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {          
          if (!req || !req.cookies) {
            return null;
          }
          return req.cookies['refreshToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: { sub: string; email: string }) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
