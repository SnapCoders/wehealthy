import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { ShowUserService } from '@modules/users/services/ShowUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { Query } from '@shared/helpers/QueryHelper';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;

    const listUsersService = container.resolve(ListUsersService);

    const [users, total] = await listUsersService.execute(Query.get(query));

    Query.paginate(response, { query, total });

    return response.status(200).json({ data: classToClass(users) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute({
      username,
      name,
      email,
      password,
    });

    return response.status(201).json({ data: classToClass(createdUser) });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ id: String(id) });

    return response.json({ data: classToClass(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { username, name, email } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id: String(id),
      username: String(username),
      name: String(name),
      email: String(email),
    });

    return response.json({ data: classToClass(user) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id: String(id) });

    return response.status(204).send({});
  }
}

export { UsersController };
