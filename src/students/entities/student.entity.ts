import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() maSV: string;
  @Column() hoVaTen: string;
  @Column() email: string;

  @Column() khoa: string;
  @Column() ngaySinh: string;
  @Column() lop: string;
  @Column() diaChi: string;
  @Column() sdt: string;
}
