import { v4 } from 'uuid';

import { User } from '@modules/users/app/typeorm/entities/User';
import { ICreateUser } from '@modules/users/contracts/IUserDTO';

import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUser): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundedIndex = this.users.findIndex(item => item.id === user.id);

    this.users[foundedIndex] = user;

    return user;
  }

  public async find(): Promise<[User[], number]> {
    return [this.users, this.users.length];
  }

  public async findById(id: string): Promise<User | undefined> {
    const founded = this.users.find(user => user.id === id);

    return founded;
  }

  public async findByIds(ids: string[]): Promise<User[] | undefined> {
    const founds = this.users.filter(user => ids.includes(user.id));

    return founds;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const founded = this.users.find(user => user.email === email);

    return founded;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const founded = this.users.find(user => user.username === username);

    return founded;
  }

  public async delete(id: string): Promise<void> {
    const founded = this.users.find(item => item.id === id);

    this.users.splice(this.users.indexOf(founded, 1));
  }
}

export { FakeUsersRepository };
