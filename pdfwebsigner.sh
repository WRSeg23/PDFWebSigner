#!/bin/bash

print_line(){
    echo "========================================================================="
}

sudo docker images &> /dev/null 
[ $? -eq 0 ] || {
    echo ""
    print_line
    echo "[ALERTA] necessário ter o docker instalado e o \"sudo docker\" operacional!"
    echo ""
    echo "INSTALE o docker:"
    echo "$ sudo apt-get install docker docker.io"
    echo ""
    echo "TESTE o docker instalado:"
    echo "$ sudo docker info"
    print_line
    echo ""
    exit
}

[ -d logs ] || { mkdir logs; }

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
