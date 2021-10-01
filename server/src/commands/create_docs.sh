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
  read -p "Qual módulo deseja criar a documentação? " module;
  echo "";
  module=$module;
fi

mkdir -p ./src/docs/routes;

echo "paths:
  /${singular,}s:
    get:
      tags:
        - ${singular^}
      summary: Lista todos os dados de todos os objetos.
      security:
        - BearerAuth: []
      produces:
      - application/json
      responses:
        200:
          description: Retorna todos os dados de todos os objetos.
        400:
          description: Solicitação mal sucedida.
        401:
          description: Solicitação não permitida.
        403:
          description: Solicitação não autorizada.
        500:
          description: Erro interno no servidor.

    post:
      tags:
        - ${singular^}
      summary: Cria um novo objeto.
      security:
        - BearerAuth: []
      produces:
      - application/json
      requestBody:
        required: true
        content:
          application/json:
            schema:
              \$ref: '#/definitions/${singular^}'
      responses:
        201:
          description: Objeto cadastrado com sucesso.
        400:
          description: Solicitação mal sucedida.
        401:
          description: Solicitação não permitida.
        403:
          description: Solicitação não autorizada.
        500:
          description: Erro interno no servidor.

  /${singular,}s/{id}:
    get:
      tags:
        - ${singular^}
      summary: Busca um objeto por id.
      security:
        - BearerAuth: []
      produces:
      - application/json
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: Id numérico do objeto.
      responses:
        200:
          description: Retorna todos os dados de um objeto.
        400:
          description: Solicitação mal sucedida.
        401:
          description: Solicitação não permitida.
        403:
          description: Solicitação não autorizada.
        404:
          description: Objeto não encontrado.
        500:
          description: Erro interno no servidor.

    put:
      tags:
        - ${singular^}
      summary: Atualiza todos os atributos de um objeto.
      security:
        - BearerAuth: []
      produces:
      - application/json
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: Id numérico do objeto.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              \$ref: '#/definitions/${singular^}'
      responses:
        200:
          description: Objeto atualizado com sucesso.
        400:
          description: Solicitação mal sucedida.
        401:
          description: Solicitação não permitida.
        403:
          description: Solicitação não autorizada.
        404:
          description: Objeto não encontrado.
        500:
          description: Erro interno no servidor.

    patch:
      tags:
        - ${singular^}
      summary: Atualiza apenas alguns atributos de um objeto.
      security:
        - BearerAuth: []
      produces:
      - application/json
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: Id numérico do objeto.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              \$ref: '#/definitions/${singular^}'
      responses:
        200:
          description: Objeto atualizado com sucesso.
        400:
          description: Solicitação mal sucedida.
        401:
          description: Solicitação não permitida.
        403:
          description: Solicitação não autorizada.
        404:
          description: Objeto não encontrado.
        500:
          description: Erro interno no servidor.

    delete:
      tags:
        - ${singular^}
      summary: Remove um objeto existente.
      security:
        - BearerAuth: []
      produces:
      - application/json
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: Id numérico do objeto.
      responses:
        204:
          description: Objeto excluído com sucesso.
        401:
          description: Solicitação não permitida.
        403:
          description: Solicitação não autorizada.
        404:
          description: Objeto não encontrado.
        500:
          description: Erro interno no servidor.

definitions:
  ${singular^}:
    type: object
    properties:
      example:
        type: string" > ./src/docs/routes/${singular,}.yaml

echo "
Created swagger documentation.";
