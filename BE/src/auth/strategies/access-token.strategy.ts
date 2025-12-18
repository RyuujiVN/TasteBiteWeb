import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/role/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN!,
    });
  }

  async validate(payload: any) {
    const role = await this.roleRepository.findOne({
      where: { title: payload.role },
      select: {
        permissions: true,
      },
    });

    if (!role) throw new ForbiddenException('Có lỗi với role của bạn');

    return {
      ...payload,
      permissions: role.permissions.split(', '),
    };
  }
}
