import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { User } from '../app/typeorm/entities/User';
import { IUpdateUser } from '../contracts/IUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, ...rest }: IUpdateUser): Promise<User> {
    const foundedUserById = await this.usersRepository.findById(id);

    if (!foundedUserById) {
      throw new AppError('User not found!', 404);
    }

    const foundedUserByEmail = await this.usersRepository.findByEmail(
      rest.email,
    );

    if (foundedUserByEmail && foundedUserByEmail.id !== id) {
      throw new AppError('This e-mail is already exists!', 406);
    }

    const foundedUserByUsername = await this.usersRepository.findByUsername(
      rest.username,
    );

    if (foundedUserByUsername && foundedUserByUsername.id !== id) {
      throw new AppError('This username is already exists!', 406);
    }

    await this.usersRepository.save({ ...foundedUserById, ...rest });

    const updatedUser = await this.usersRepository.findById(id);

    return updatedUser;
  }
}

export { UpdateUserService };
