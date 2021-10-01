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
  read -p "Qual módulo deseja criar a rota? " module;
  echo "";
  module=$module;
fi

mkdir -p ./src/modules/${module}/app/http/routes;

echo "import { Router } from 'express';

import { ${singular^}sController } from '../controllers/${singular^}sController';

const ${singular,}sRouter = Router();

const ${singular,}sController = new ${singular^}sController();

${singular,}sRouter.get('/', ${singular,}sController.index);
${singular,}sRouter.post('/', ${singular,}sController.create);
${singular,}sRouter.get('/:id', ${singular,}sController.show);
${singular,}sRouter.put('/:id', ${singular,}sController.update);
${singular,}sRouter.delete('/:id', ${singular,}sController.delete);

export { ${singular,}sRouter };" > ./src/modules/${module}/app/http/routes/${singular,}s.routes.ts

echo "Created ${singular^} routes.";
