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
  read -p "Qual módulo deseja criar o repositório? " module;
  echo "";
  module=$module;
fi

mkdir -p ./src/modules/${module}/app/typeorm/repositories;
mkdir -p ./src/modules/${module}/repositories/fakes;

echo "import { ${singular^} } from '../app/typeorm/entities/${singular^}';
import { ICreate${singular^}, I${singular^} } from '../contracts/I${singular^}';

export interface I${singular^}sRepository {
  create(data: ICreate${singular^}): Promise<${singular^}>;
  save(model: Partial<I${singular^}>): Promise<${singular^}>;
  find(): Promise<${singular^}[]>;
  findById(id: string): Promise<${singular^} | undefined>;
  findByIds(ids: string[]): Promise<${singular^}[]>;
  delete(id: string): Promise<void>;
}" > ./src/modules/${module}/repositories/I${singular^}sRepository.ts

echo "import { getRepository, Repository, In } from 'typeorm';

import { ICreate${singular^} } from '@modules/${module}/contracts/I${singular^}';
import { I${singular^}sRepository } from '@modules/${module}/repositories/I${singular^}sRepository';

import { ${singular^} } from '../entities/${singular^}';

class ${singular^}sRepository implements I${singular^}sRepository {
  private ormRepository: Repository<${singular^}>;

  constructor() {
    this.ormRepository = getRepository(${singular^});
  }

  public async create(data: ICreate${singular^}): Promise<${singular^}> {
    const ${singular,} = this.ormRepository.create(data);

    await this.ormRepository.save(${singular,});

    return ${singular,};
  }

  public async save(${singular,}: ${singular^}): Promise<${singular^}> {
    await this.ormRepository.save(${singular,});

    return ${singular,};
  }

  public async find(): Promise<${singular^}[]> {
    const founded${singular^}s = await this.ormRepository.find();

    return founded${singular^}s;
  }

  public async findById(id: string): Promise<${singular^}> {
    const founded${singular^} = await this.ormRepository.findOne(id);

    return founded${singular^};
  }

  public async findByIds(ids: string[]): Promise<${singular^}[]> {
    const founded${singular^}s = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    return founded${singular^}s;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { ${singular^}sRepository };" > ./src/modules/${module}/app/typeorm/repositories/${singular^}sRepository.ts

echo "import { ${singular^} } from '@modules/${module}/app/typeorm/entities/${singular^}';
import { ICreate${singular^} } from '@modules/${module}/contracts/I${singular^}';

import { I${singular^}sRepository } from '../I${singular^}sRepository';

class Fake${singular^}sRepository implements I${singular^}sRepository {
  private ${module}: ${singular^}[] = [];

  public async create(data: ICreate${singular^}): Promise<${singular^}> {
    const ${singular,} = new ${singular^}();

    const { length } = this.${module};

    const id = length === 0 ? 1 : this.${module}[length - 1].id + 1;

    Object.assign(${singular,}, { id }, data);

    this.${module}.push(${singular,});

    return ${singular,};
  }

  public async save(${singular,}: ${singular^}): Promise<${singular^}> {
    const foundedIndex = this.${module}.findIndex(item => item.id === ${singular,}.id);

    this.${module}[foundedIndex] = ${singular,};

    return ${singular,};
  }

  public async find(): Promise<${singular^}[]> {
    return this.${module};
  }

  public async findById(id: string): Promise<${singular^} | undefined> {
    const founded = this.${module}.find(${singular,} => ${singular,}.id === id);

    return founded;
  }

  public async findByIds(ids: string[]): Promise<${singular^}[] | undefined> {
    const founds = this.${module}.filter(${singular,} => ids.includes(${singular,}.id));

    return founds;
  }

  public async delete(id: string): Promise<void> {
    const founded = this.${module}.find(item => item.id === id);

    this.${module}.splice(this.${module}.indexOf(founded, 1));
  }
}

export { Fake${singular^}sRepository };" > ./src/modules/${module}/repositories/fakes/Fake${singular^}sRepository.ts

if test -f "./src/shared/container/${module}/index.ts"; then
  echo "import { ${singular^}sRepository } from '@modules/${module,}/app/typeorm/repositories/${singular^}sRepository';
  import { I${singular^}sRepository } from '@modules/${module,}/repositories/I${singular^}sRepository';

  container.registerSingleton<I${singular^}sRepository>(
    '${singular^}sRepository',
    ${singular^}sRepository,
  );" >> ./src/shared/container/${module}/index.ts
else
  mkdir -p ./src/shared/container/${module,};

  echo "import { container } from 'tsyringe';

  import { ${singular^}sRepository } from '@modules/${module,}/app/typeorm/repositories/${singular^}sRepository';
  import { I${singular^}sRepository } from '@modules/${module,}/repositories/I${singular^}sRepository';

  container.registerSingleton<I${singular^}sRepository>(
    '${singular^}sRepository',
    ${singular^}sRepository,
  );" > ./src/shared/container/${module}/index.ts

  echo "import './${module}';" >> ./src/shared/container/index.ts
fi

echo "Created ${singular^} repository.";
echo "Created ${singular^} fake repository.";
echo "Created ${singular^} repository interface.";
echo "Created ${singular^} dependency injection.";
echo "";
