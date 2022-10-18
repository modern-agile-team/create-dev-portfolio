import { RowDataPacket } from 'mysql2';

export interface VisitorDto extends RowDataPacket {
  todayCount: number;
  totalCount: number;
  todayDate?: string;
}

export interface VisitorCmtDto {
  nickname?: string;
  password: string;
  description: string;
}

export interface VisitorCmtEntity extends RowDataPacket {
  id: number;
  nickname: string;
  description: string;
  date: string;
}

export interface VisitorPasswordEntity extends RowDataPacket {
  password: string;
}
