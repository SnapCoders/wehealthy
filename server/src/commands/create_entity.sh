#!/bin/bash

module=${2,,};
s="s";
entity=$(echo $1 | sed 's/[[:upper:]]/_&/g;s/^_//' | tr '[:upper:]' '[:lower:]')${s};
singular=${1};
last=${1: -1};

if [ $last == "s" ]
then
  singular=${1%?};
fi

if [ -z "$module" ]
then
  echo "";
  read -p "Qual módulo deseja criar a entidade? " module;
  echo "";
  module=$module;
fi

mkdir -p ./src/modules/${module}/app/typeorm/entities;
mkdir -p ./src/modules/${module}/contracts;

echo "import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('${entity}')
class ${singular^} extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { ${singular^} };" > ./src/modules/${module}/app/typeorm/entities/${singular^}.ts;

echo "/**
 * Model: ${singular^}
 */
export type I${singular^} = {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

/**
 * Method: POST
 * Create ${singular^}
 */
export interface ICreate${singular^} {}

/**
 * Method: GET
 * SHOW ${singular^}
 */
export type IShow${singular^} = Pick<IUpdate${singular^}, 'id'>;

/**
 * Method: PUT
 * Update ${singular^}
 */
export interface IUpdate${singular^} extends ICreate${singular^} {
  id: number;
}

/**
 * Method: PATCH
 * Update ${singular^}
 */
export type IPartialUpdate${singular^} = Partial<IUpdate${singular^}>;

/**
 * DELETE ${singular^}
 */
export type IDelete${singular^} = Pick<IUpdate${singular^}, 'id'>;" > ./src/modules/${module}/contracts/I${singular^}.ts

echo "Created ${singular^} entity.";
echo "Created ${singular^} contract.";
echo "";
