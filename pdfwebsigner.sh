#!/bin/bash

echo "========================================================"
echo -n "Inicializando o container Docker ... "
./run_demo_docker.sh &> logs/demo_docker.log &  
sleep 3
echo "done."
echo "========================================================"


echo "========================================================"
echo -n "Inicializando o navegador ... "
./run_demo_browser.sh &> logs/demo_browser.log & 
sleep 1
echo "done."
echo "========================================================"

echo "========================================================"
echo "Monitorando os logs de execução do container Docker ... "
echo "          <precione Ctrl+C para finalizar>"
echo "========================================================"

tail -f logs/demo_docker.log 
