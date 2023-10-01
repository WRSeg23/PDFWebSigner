#!/bin/bash
[ $1 ] && [ -d $1 ] || { echo "Use: $0 <shared_certificate_dir>"; exit; }
DIR=$(readlink -f $1)
sudo docker image pull sf23/pdfwebsigner:latest
sudo docker run -it --name=pdfwebsigner-$RANDOM -p 127.0.0.1:80:80 -v $DIR:/var/www/html -e DISPLAY=unix$DISPLAY sf23/pdfwebsigner:latest 
