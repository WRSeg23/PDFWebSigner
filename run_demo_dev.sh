#!/bin/bash
DIR=$(readlink -f shared)
DOCKER_IMAGE=sf23/pdfwebsigner:latest
sudo docker run -it --name=pdfwebsigner-$RANDOM -p 127.0.0.1:80:80 -v $DIR:/var/www/html -e DISPLAY=unix$DISPLAY $DOCKER_IMAGE
