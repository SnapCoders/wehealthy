import {
  ICreateUser,
  ICreateUserRequest,
} from '@modules/users/contracts/IUserDTO';

const makeUser = (user?: Partial<ICreateUserRequest>): ICreateUserRequest => {
  return {
    username: user?.username || 'jdoe',
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    password: user?.password || 'ABC123def456',
  };
};

const makeUserWithPasswordHash = (user?: Partial<ICreateUser>): ICreateUser => {
  return {
    username: user?.username || 'jdoe',
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    password_hash: user?.password_hash || 'ABC123def456',
  };
};

export { makeUser, makeUserWithPasswordHash };
