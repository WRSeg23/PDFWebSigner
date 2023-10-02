#!/bin/bash
DIR=$(readlink -f shared)
DOCKER_IMAGE=sf23/pdfwebsigner:latest
sudo docker inspect $DOCKER_IMAGE &> /dev/null
if [ $? -ne 0 ]
then
    sudo docker image pull $DOCKER_IMAGE
fi
sudo docker run -it --name=pdfwebsigner-$RANDOM -p 127.0.0.1:80:80 -v $DIR:/var/www/html -e DISPLAY=unix$DISPLAY $DOCKER_IMAGE
