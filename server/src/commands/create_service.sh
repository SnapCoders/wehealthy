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
  read -p "Qual módulo deseja criar o serviço? " module;
  echo "";
  module=$module;
fi

mkdir -p ./src/modules/${module}/services;
mkdir -p ./src/modules/${module}/tests;
mkdir -p ./src/modules/${module}/tests/unit;
mkdir -p ./src/modules/${module}/tests/integration;

echo "import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ${module^} } from '../app/typeorm/entities/${module^}';
import { I${singular^} } from '../contracts/I${singular^}';
import { I${module^}Repository } from '../repositories/I${module^}Repository';

@injectable()
class ${singular^}Service {
  constructor(
    @inject('${module^}Repository')
    private ${module}Repository: I${module^}Repository,
  ) {}

  public async execute(data: I${singular^}): Promise<${singular^}> {
    console.info(data);
    throw new AppError('Implement your code here!');
  }
}

export { ${singular^}Service };" > ./src/modules/${module}/services/${singular^}Service.ts

echo "import { Fake${singular^}sRepository } from '../repositories/fakes/Fake${singular^}sRepository';
import { ${singular^}Service } from './${singular^}Service';

let fake${module^}sRepository: Fake${module^}sRepository;
let ${singular^}Service: ${singular^}Service;

describe('${singular^}', () => {
  beforeEach(() => {
    fake${module^}sRepository = new Fake${module^}sRepository();
    ${singular^}Service = new ${singular^}Service(fake${module^}sRepository);
  });

  it('should be able to create a new ${singular}', async () => {
    const ${singular} = await ${singular^}Service.execute({
      example: 'John Doe'
    });

    expect(${singular}).toHaveProperty('id');
  });
});" > ./src/modules/${module}/tests/unit/${singular^}Service.spec.ts

echo "Created ${singular^} service.";
echo "Created ${singular^} test service.";
echo "
Service ${singular^} successfully created 🎉.";
