#!/bin/bash

sudo docker images 

./run_demo_docker.sh &> logs/demo_docker.log &  

sleep 5

./run_demo_browser.sh &> logs/demo_browser.log & 

tail -f logs/demo_docker.log 
