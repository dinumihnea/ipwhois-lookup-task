import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IpwhoisResponse } from '../ipwhois/interfaces/ipwhois.response';

@Entity({
  name: 'ips',
})
export class IpEntity {
  @PrimaryColumn({
    type: 'inet',
  })
  ip: string;

  @Column('jsonb', { default: {} })
  data: IpwhoisResponse;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
