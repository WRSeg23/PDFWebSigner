#!/bin/bash

print_line(){
    echo "========================================================================="
}

sudo docker images &> /dev/null 
[ $? -eq 0 ] || {
    echo ""
    print_line
    echo "[ALERTA] É necessário ter o docker instalado e \"sudo docker\" operacional!"
    echo "$ sudo apt-get install docker docker.io"
    print_line
    echo ""
    exit
}

echo ""
print_line
echo -n "Inicializando o container Docker ... "
./run_demo_docker.sh pull &> logs/demo_docker.log &  
sleep 3
echo "done."
print_line
echo ""


print_line
echo -n "Inicializando o navegador ... "
./run_demo_browser.sh &> logs/demo_browser.log & 
sleep 1
echo "done."
print_line

echo ""
print_line
echo "Monitorando os logs de execução do container Docker ... "
echo "          <precione Ctrl+C para finalizar>"
print_line
echo ""

sleep 2

tail -f logs/demo_docker.log 
