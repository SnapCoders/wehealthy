import { IModel } from '@shared/contracts/IModel';

import { Appointments } from '../app/typeorm/entities/Appointments';

/**
 * Model: Appointments
 */
export type IAppointments = IModel<Appointments>;

/**
 * Method: POST
 * Create Appointments
 */
export interface ICreateAppointments {
  user_id: string;
  nutritionist_id: string;
  date: string;
  type: string;
  link: string;
}

export type ICreateAppointmentsRequest = ICreateAppointments;

/**
 * Method: GET
 * SHOW Appointments
 */
export type IShowAppointments = Pick<IUpdateAppointments, 'id'>;

/**
 * Method: PUT
 * Update Appointments
 */
export interface IUpdateAppointments extends ICreateAppointments {
  id: string;
}

/**
 * Method: PATCH
 * Update Appointments
 */
export type IPartialUpdateAppointments = Partial<IUpdateAppointments>;

/**
 * DELETE Appointments
 */
export type IDeleteAppointments = Pick<IUpdateAppointments, 'id'>;
