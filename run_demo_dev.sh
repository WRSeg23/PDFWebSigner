        #!/bin/bash
DIR=$(readlink -f files)
DOCKER_IMAGE=sf23/pdfwebsigner:latest
sudo docker run -it --name=pdfwebsigner-$RANDOM -p 127.0.0.1:8888:80 -v $DIR:/var/www/html/files -e DISPLAY=unix$DISPLAY $DOCKER_IMAGE
