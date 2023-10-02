#!/bin/bash
sudo docker run -it -p 127.0.0.1:8888:8888 --name=pdfwebsigner-$RANDOM -e DISPLAY=unix$DISPLAY sf23/pdfwebsigner:latest $*
