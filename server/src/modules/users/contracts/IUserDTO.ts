import { IModel } from '@shared/contracts/IModel';

import { User } from '../app/typeorm/entities/User';

/**
 * Model: User
 */
export type IUser = IModel<User>;

/**
 * Method: POST
 * Create User
 */
export interface ICreateUser {
  username: string;
  name: string;
  email: string;
  password_hash?: string;
}

export interface ICreateUserRequest extends Omit<ICreateUser, 'password_hash'> {
  password: string;
}

/**
 * Method: GET
 * SHOW User
 */
export type IShowUser = Pick<IUpdateUser, 'id'>;

/**
 * Method: PUT
 * Update User
 */
export interface IUpdateUser extends ICreateUser {
  id: string;
}

/**
 * Method: PATCH
 * Update User
 */
export type IPartialUpdateUser = Partial<IUpdateUser>;

/**
 * DELETE User
 */
export type IDeleteUser = Pick<IUpdateUser, 'id'>;
