import { IQuery } from '@shared/contracts/IQuery';

import {
  ICreateUsersAppointments,
  IUsersAppointments,
} from '../contracts/IUserAppointmentsDTO';

export interface IUsersAppointmentsRepository {
  create(data: ICreateUsersAppointments): Promise<IUsersAppointments>;
  save(model: Partial<ICreateUsersAppointments>): Promise<IUsersAppointments>;
  find(query?: IQuery): Promise<[IUsersAppointments[], number]>;
  findById(id: string): Promise<IUsersAppointments | undefined>;
  delete(id: string): Promise<void>;
}
