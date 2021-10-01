import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { ListUsersService } from '@modules/users/services/ListUsersService';

import { makeUser } from '../factories/UserFactory';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const created1 = await fakeUsersRepository.create(makeUser());

    const created2 = await fakeUsersRepository.create(makeUser());

    const [users] = await listUsersService.execute();

    expect(users).toEqual([created1, created2]);
  });
});
