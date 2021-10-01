import { injectable, inject } from 'tsyringe';

import { IQuery } from '@shared/contracts/IQuery';

import { User } from '../app/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(query?: IQuery): Promise<[User[], number]> {
    const users = await this.usersRepository.find(query);

    return users;
  }
}

export { ListUsersService };
