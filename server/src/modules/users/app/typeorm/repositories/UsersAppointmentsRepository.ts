import { getRepository, Repository } from 'typeorm';

import { IUsersAppointmentsRepository } from '@modules/users/repositories/IUsersAppointmentsRepository';
import { IQuery } from '@shared/contracts/IQuery';

import { UsersAppointments } from '../entities/UsersAppointments';

class UsersAppointmentsRepository implements IUsersAppointmentsRepository {
  private ormRepository: Repository<UsersAppointments>;

  private defaultRelations: string[] = [
    // 'costs',
    // 'users_groups',
    // 'users_groups.group',
  ];

  constructor() {
    this.ormRepository = getRepository(UsersAppointments);
  }

  public async create(data: UsersAppointments): Promise<UsersAppointments> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: UsersAppointments): Promise<UsersAppointments> {
    await this.ormRepository.save(user);

    return user;
  }

  public async find(query?: IQuery): Promise<[UsersAppointments[], number]> {
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

  public async findById(id: string): Promise<UsersAppointments> {
    const foundedUser = await this.ormRepository.findOne(id);

    return foundedUser;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { UsersAppointmentsRepository };
