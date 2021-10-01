import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeMailProvider } from '@shared/providers/MailProvider/fakes/FakeMailProvider';

import { makeUser } from '../factories/UserFactory';

let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeMailProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const created = await createUserService.execute(makeUser());

    expect(created).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to create a new user with email already exists', async () => {
    await createUserService.execute(makeUser({ email: 'john@example.com' }));

    await expect(
      createUserService.execute(makeUser({ email: 'john@example.com' })),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with username already exists', async () => {
    await createUserService.execute(makeUser({ email: 'john@example.com' }));

    await expect(
      createUserService.execute(makeUser({ email: 'john2@example.com' })),
    ).rejects.toBeInstanceOf(AppError);
  });
});
