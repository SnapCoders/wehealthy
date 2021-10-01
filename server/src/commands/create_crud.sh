#!/bin/bash

module=${2,,};
singular=${1};
last=${1: -1};

if [ $last == "s" ]
then
  singular=${1%?};
fi

bash "./src/commands/create_entity.sh" ${singular} ${module};
bash "./src/commands/create_repository.sh" ${singular} ${module};
bash "./src/commands/create_controller.sh" ${singular} ${module};
bash "./src/commands/create_route.sh" ${singular} ${module};
bash "./src/commands/create_docs.sh" ${singular} ${module};

echo "
CRUD ${singular^} successfully created 🎉.";
