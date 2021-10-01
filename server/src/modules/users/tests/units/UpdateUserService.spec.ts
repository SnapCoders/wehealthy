import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { AppError } from '@shared/errors/AppError';

import { makeUserWithPasswordHash } from '../factories/UserFactory';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update a user', async () => {
    const created = await fakeUsersRepository.create(
      makeUserWithPasswordHash(),
    );

    const updated = await updateUserService.execute({
      ...created,
      username: 'jdoe.updated',
      name: 'John Doe Updated',
      email: 'john.doe.updated@example.com',
    });

    expect(updated.username).toBe('jdoe.updated');
    expect(updated.name).toBe('John Doe Updated');
    expect(updated.email).toBe('john.doe.updated@example.com');
  });

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateUserService.execute({
        id: 'non-existing-user',
        ...makeUserWithPasswordHash(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with same email from another user', async () => {
    await fakeUsersRepository.create(
      makeUserWithPasswordHash({ email: 'john1@example.com' }),
    );

    const created = await fakeUsersRepository.create(
      makeUserWithPasswordHash({ email: 'john2@example.com' }),
    );

    await expect(
      updateUserService.execute({ ...created, email: 'john1@example.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with same username from another user', async () => {
    await fakeUsersRepository.create(
      makeUserWithPasswordHash({
        email: 'john1@example.com',
        username: 'john1',
      }),
    );

    const created = await fakeUsersRepository.create(
      makeUserWithPasswordHash({
        email: 'john2@example.com',
        username: 'john2',
      }),
    );

    await expect(
      updateUserService.execute({ ...created, username: 'john1' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
