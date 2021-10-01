import { IQuery } from '@shared/contracts/IQuery';

import { User } from '../app/typeorm/entities/User';
import { ICreateUser, IUser } from '../contracts/IUserDTO';

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  save(model: Partial<IUser>): Promise<User>;
  find(query?: IQuery): Promise<[User[], number]>;
  findById(id: string): Promise<User | undefined>;
  findByIds(ids: string[]): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}
