import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateAppointmentsRequest } from '@modules/appointment/contracts/IAppointments';
import { CreateAppointmentsService } from '@modules/appointment/services/CreateAppointmentsService';
import { DeleteAppointmentService } from '@modules/appointment/services/DeleteAppointmentService';
import { ListAppointmentService } from '@modules/appointment/services/ListAppointmentsService';
import { ShowAppointmentService } from '@modules/appointment/services/ShowAppointmentService';
import { UpdateAppointmentService } from '@modules/appointment/services/UpdateAppointmentService';
import { AssociateAppointmentsToManyUsersService } from '@modules/users/services/AssociateAppointmentsToManyUsersService';
import { Query } from '@shared/helpers/QueryHelper';

class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;

    const listAppointmentsService = container.resolve(ListAppointmentService);

    const [users, total] = await listAppointmentsService.execute(
      Query.get(query),
    );

    Query.paginate(response, { query, total });

    return response.status(200).json({ data: classToClass(users) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const appointment: ICreateAppointmentsRequest = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentsService,
    );

    const createdAppointment = await createAppointmentService.execute(
      appointment,
    );

    const associateAppointmentToManyUsers = container.resolve(
      AssociateAppointmentsToManyUsersService,
    );

    await associateAppointmentToManyUsers.execute({
      users_ids: [
        createdAppointment.user_id,
        createdAppointment.nutritionist_id,
      ],
      appointment_id: createdAppointment.id,
    });

    return response
      .status(201)
      .json({ data: classToClass(createdAppointment) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAppointmentService = container.resolve(ShowAppointmentService);

    const user = await showAppointmentService.execute({ id: String(id) });

    return response.json({ data: classToClass(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { username, name, email } = request.body;

    const updateAppointmentService = container.resolve(
      UpdateAppointmentService,
    );

    const user = await updateAppointmentService.execute({
      id: String(id),
      username: String(username),
      name: String(name),
      email: String(email),
    });

    return response.json({ data: classToClass(user) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAppointmentService = container.resolve(
      DeleteAppointmentService,
    );

    await deleteAppointmentService.execute({ id: String(id) });

    return response.status(204).send({});
  }
}

export { AppointmentsController };
