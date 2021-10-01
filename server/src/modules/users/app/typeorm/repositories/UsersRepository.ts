import { getRepository, Repository, In } from 'typeorm';

import { ICreateUser } from '@modules/users/contracts/IUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IQuery } from '@shared/contracts/IQuery';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  private defaultRelations: string[] = [
    // 'costs',
    // 'users_groups',
    // 'users_groups.group',
  ];

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUser): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async find(query?: IQuery): Promise<[User[], number]> {
    const foundedUsers = await this.ormRepository.findAndCount({
      where: query?.where,
      order: query?.order,
      relations: query?.relations || this.defaultRelations,
      skip: query?.pagination.skip,
      // skip: query?.pagination.take * (page - 1),
      take: query?.pagination.take,
    });

    return foundedUsers;
  }

  public async findById(id: string): Promise<User> {
    const foundedUser = await this.ormRepository.findOne(id);

    return foundedUser;
  }

  public async findByIds(ids: string[]): Promise<User[]> {
    const foundedUsers = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    return foundedUsers;
  }

  public async findByEmail(email: string): Promise<User> {
    const foundedUser = await this.ormRepository.findOne({
      where: { email },
    });

    return foundedUser;
  }

  public async findByUsername(username: string): Promise<User> {
    const foundedUser = await this.ormRepository.findOne({
      where: { username },
    });

    return foundedUser;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { UsersRepository };
