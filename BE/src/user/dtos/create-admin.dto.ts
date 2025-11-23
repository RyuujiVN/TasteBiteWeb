import { IsInt, IsOptional } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class CreateAdminDTO extends CreateUserDTO {
  @IsInt({ message: 'Role id phải là số!' })
  @IsOptional()
  role_id?: number;
}
