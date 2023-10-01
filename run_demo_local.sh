#!/bin/bash

[ $1 ] && [ -d $1 ] || { echo "Use: $0 <shared_certificate_dir>"; exit; }

./run_demo_browser.sh &> /dev/null &

sudo docker run -it -p 127.0.0.1:80:80 --name=pdfwebsigner-$RANDOM -v $(readlink -f $1):/pdfwebsigner/shared -e DISPLAY=unix$DISPLAY sf23/pdfwebsigner:latest 
