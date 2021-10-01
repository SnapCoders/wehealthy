import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { AppError } from '@shared/errors/AppError';

import { makeUserWithPasswordHash } from '../factories/UserFactory';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const { id } = await fakeUsersRepository.create(makeUserWithPasswordHash());

    const user = await deleteUserService.execute({ id });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to show a non existing user', async () => {
    await expect(
      deleteUserService.execute({ id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
