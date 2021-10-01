import path from 'path';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/providers/MailProvider/models/IMailProvider';

import { User } from '../app/typeorm/entities/User';
import { ICreateUserRequest } from '../contracts/IUserDTO';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    username,
    name,
    email,
    password,
  }: ICreateUserRequest): Promise<User> {
    const foundedUserByEmail = await this.usersRepository.findByEmail(email);

    if (foundedUserByEmail) {
      throw new AppError('This e-mail is already exists!', 406);
    }

    const foundedUserByUsername = await this.usersRepository.findByUsername(
      username,
    );

    if (foundedUserByUsername) {
      throw new AppError('This username is already exists!', 406);
    }

    const password_hash = await this.hashProvider.generateHash(password);

    const createdUser = await this.usersRepository.create({
      username,
      name,
      email,
      password_hash,
    });

    const file = path.resolve(__dirname, '..', 'views', 'welcome_new_user.hbs');

    await this.mailProvider.sendMail({
      to: { name: createdUser.name, email: createdUser.email },
      subject: '[WeHealthy] Confirmação de e-mail',
      templateData: { file, variables: { name: createdUser.name } },
    });

    return createdUser;
  }
}

export { CreateUserService };
