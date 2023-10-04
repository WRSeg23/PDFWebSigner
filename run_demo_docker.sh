#!/bin/bash
[ $1 ] || { 
    echo "Usage: $0 <build|pull|run>"
    echo "    build = building docker image"
    echo "    pull  = get image from Docker Hub (hub.docker.com)"
    echo "    run   = run local docker image (requires build or pull first)"
    exit
} 
DIR=$(readlink -f files)
DOCKER_IMAGE=sf23/pdfwebsigner:latest
DOCKER_CMD="sudo docker"
$DOCKER_CMD inspect $DOCKER_IMAGE &> /dev/null
if [ $? -ne 0 ]
then
    echo "Run first one of the following two options: "
    echo "  $0 build"
    echo "  $0 pull"
    exit
fi
case $1 in
    build)
        $DOCKER_CMD build . 
    ;;
    pull)
        $DOCKER_CMD image pull $DOCKER_IMAGE
    ;;
esac
$DOCKER_CMD run -it --name=pdfwebsigner-$RANDOM -p 127.0.0.1:8888:80 -v $DIR:/var/www/html/files -e DISPLAY=unix$DISPLAY $DOCKER_IMAGE
