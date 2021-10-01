#!/bin/bash

module=${2,,};
singular=${1};
last=${1: -1};

if [ $last == "s" ]
then
  singular=${1%?};
fi

if [ -z "$module" ]
then
  echo "";
  read -p "Qual módulo deseja criar a controller? " module;
  echo "";
  module=$module;
fi

mkdir -p ./src/modules/${module}/app/http/controllers;
mkdir -p ./src/modules/${module}/tests/integration;

echo "import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

class ${singular^}sController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json(classToClass([]));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    return response.status(201).json(classToClass(body));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    return response.json(classToClass(id));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    return response.json(classToClass(id));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    return response.send(id);
  }
}

export { ${singular^}sController };" > ./src/modules/${module}/app/http/controllers/${singular^}sController.ts

echo "Created ${singular^} controller.";
