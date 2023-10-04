#!/bin/bash

print_line(){
    echo "========================================================================="
}

sudo docker info &> /dev/null 
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

which firefox &> /dev/null
[ $? -eq 0 ] || {
    print_line
    echo "[ALERTA] script configurado para executar o \"firefox\""
    echo "    Abra a URL http://127.0.0.1:8888 no seu navegador"
    print_line
    echo ""
    echo -n "Precione uma tecla e <ENTER> para continuar: "
    read WAIT
}

print_line
echo -n "Inicializando o navegador ... "
firefox http://localhost:8888 &> logs/demo_browser.log & 
sleep 1
echo "done."
print_line

echo ""
print_line
echo "Monitorando os logs de execução do container Docker ... "
echo "          <precione Ctrl+C para finalizar>"
print_line
echo ""

tail -f logs/demo_docker.log 
