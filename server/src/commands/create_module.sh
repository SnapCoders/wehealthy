#!/bin/bash

module=${2,,};
singular=${1};
last=${1: -1};

if [ $last == "s" ]
then
  singular=${1%?};
fi

mkdir -p ./src/modules/${module}
mkdir -p ./src/modules/${module}/helpers
mkdir -p ./src/modules/${module}/providers
mkdir -p ./src/modules/${module}/services
mkdir -p ./src/shared/container

bash "./src/commands/create_entity.sh" ${singular} ${module};
bash "./src/commands/create_repository.sh" ${singular} ${module};
bash "./src/commands/create_controller.sh" ${singular} ${module};
bash "./src/commands/create_route.sh" ${singular} ${module};
bash "./src/commands/create_docs.sh" ${singular} ${module};

echo "
Module ${module} successfully created 🎉.";
