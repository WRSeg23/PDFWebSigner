#!/bin/bash
[ $1 ] && [ $2 ] || { echo "Usage: $0 <debian|alpine> <force-docker-hub-pull:yes|no>"; exit; }
DISTRO=$1
USER_ID=$(id -u $USER)
DIR=$(readlink -f shared)
REPO_ID=$(pwd | sed 's/^.*\///')
DOCKER_IMAGE=cnuvem23/$REPO_ID:$DISTRO
sudo docker inspect $DOCKER_IMAGE &> /dev/null
if [ $? -ne 0 ] || [ "$2" = "yes" ]
then
    sudo docker image pull $DOCKER_IMAGE
fi
sudo docker run -it --name=cnuvem23-$RANDOM -v $DIR:/cnuvem23/shared -e DISPLAY=unix$DISPLAY $DOCKER_IMAGE /bin/sh /cnuvem23/shared/run-benchmark-$REPO_ID.sh $USER_ID $DISTRO
ls /cnuvem23/shared/
