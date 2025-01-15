import { IsIP, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IpLookupQueryDto {
  @ApiProperty({
    type: String,
    example: '8.8.4.4',
  })
  @IsNotEmpty()
  @IsIP()
  ip: string;
}
