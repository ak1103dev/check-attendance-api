ssh $MY_USER@$MY_HOST " \
docker login -u $DOCKER_USER -p $DOCKER_PASS && \
docker pull $DOCKER_USER/api && \
docker-compose up --build \
"