import { IQuery } from '@shared/contracts/IQuery';

import { Appointments } from '../app/typeorm/entities/Appointments';
import { ICreateAppointments, IAppointments } from '../contracts/IAppointments';

export interface IAppointmentsRepository {
  create(data: ICreateAppointments): Promise<Appointments>;
  save(model: Partial<IAppointments>): Promise<Appointments>;
  find(query?: IQuery): Promise<[Appointments[], number]>;
  findByUserId(id: string): Promise<Appointments | undefined>;
  findById(id: string): Promise<Appointments | undefined>;
  // findByUserIdandNutritionistId(id: string): Promise<Appointments | undefined>;
  // findByIds(ids: string[]): Promise<Appointments[]>;
  // findByEmail(email: string): Promise<Appointments | undefined>;
  // findByUsername(username: string): Promise<Appointments | undefined>;
  delete(id: string): Promise<void>;
}
