import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

class PermissionRoleDTO {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}

export class UpdatePermissionRoleDTO {
  @ApiProperty({
    type: PermissionRoleDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionRoleDTO)
  roles: PermissionRoleDTO[];
}
