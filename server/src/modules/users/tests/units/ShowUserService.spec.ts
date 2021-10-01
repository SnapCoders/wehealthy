import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { AppError } from '@shared/errors/AppError';

import { makeUser } from '../factories/UserFactory';

let fakeUsersRepository: FakeUsersRepository;
let showUserService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show the user', async () => {
    const { id } = await fakeUsersRepository.create(makeUser());

    const profile = await showUserService.execute({ id });

    expect(profile.username).toBe('jdoe');
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john.doe@example.com');
  });

  it('should not be able to show a non existing user', async () => {
    await expect(
      showUserService.execute({ id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
