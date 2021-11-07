import { IModel } from '@shared/contracts/IModel';

import { UsersAppointments } from '../app/typeorm/entities/UsersAppointments';

/**
 * Model: User
 */
export type IUsersAppointments = IModel<UsersAppointments>;

export interface ICreateUsersAppointments {
  user_id: string;
  appointment_id: string;
}

/**
 * Method: POST
 * Create User
 */

export interface IAssociateAppointmentsToManyUsers {
  appointment_id: string;
  users_ids: string[];
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
export interface IUpdateUser extends IUsersAppointments {
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
