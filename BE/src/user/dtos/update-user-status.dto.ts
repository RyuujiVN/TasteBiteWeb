import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserStatusDTO {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
