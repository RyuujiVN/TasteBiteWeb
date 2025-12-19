import { IsNotEmpty, IsString } from 'class-validator';

export class ShippingAddressDTO {
  @IsString()
  @IsNotEmpty({ message: 'Tên đường không được để trống' })
  street: string;

  @IsString()
  @IsNotEmpty({ message: 'Tỉnh không được để trống' })
  province: string;

  @IsString()
  @IsNotEmpty({ message: 'Phường/Xã không được để trống' })
  ward: string;
}
