# PDFWebSigner

Interface web intuitiva para posicionamento e geração de PDFs assinados com pyHanko.

## 1. Objetivos

Software desenvolvido em PHP e Javascript que utiliza bibliotecas Python.
Este software possui um editor que permite selecionar o lugar onde inserir uma assinatura digital em um documento PDF. Ele utiliza a biblioteca pyHanko do Python, e também têm a funcionalidade de gerar apenas as coordenadas para o pyHanko.

## 2. Forma de uso

Ma primeira tela é possível carregar o arquivo PDF que será utilizado e a assinatura digital (opcional). No campo manter assinatura, é possível manter a assinatura salva para não precisar carregá-la a cada uso.
Depois, basta clicar em enviar e em seguida selecionar o local onde a assinatura será salva. Também é possível ajustar o tamanho da caixa da assinatura.
Em seguida, basta selecionar se deseja apenas as coordenadas do pyHanko ou o PDF inteiro gerado com assinatura.

## 3. Configurações

Este software requer uma máquina linux para ser instalado. Podendo ser instalado na máquina virtual, ou em um container Docker.
Caso queira instalar via Docker, pule para o item 3.1, caso deseja instalar manualmente em uma máquina virtual, pule para 3.2;

### 3.1 Instalação Docker

Após baixar o repositório, certifique-se de ter o Docker instalado e rodando, e em seguida, baixe este respositório para a pasta desejada.

Também será necessário compartilhar a pasta deste repositório com o Docker, de modo que seja possível a persistência dos arquivos: [Como compartilhar pastas com o Docker](https://docs.docker.com/desktop/settings/windows/#file-sharing).

Abra o terminal (No Windows, é o Prompt de Comando) e navegue até a pasta em que a aplicação foi baixada, e em seguida digite o seguinte comando:

    docker compose up

Pronto! Para acessar a aplicação, basta acessar o localhost no seu navegador.

### 3.2 Instalação em Linux

Atualize seus repositórios através do comando:

    sudo apt-get update

Em seguida baixe o Python e o instalador de bibliotecas:
sudo apt-get install --yes python3 python3-pip

Também é necessário que o php seja instalado, junto com o servidor apache:

    sudo apt-get install --yes php php-common libapache2-mod-php

Em seguida, é preciso baixar o git e as fontes noto para a geração de assinaturas:

    sudo apt-get install --yes git fonts-noto

Agora, é necessário instalar as bibliotecas do Python no usuário do servidor Apache:

    sudo -Hu www-data pip3 install pyhanko image uharfbuzz fontTools

É necessário alterar as permissões do web server para que seja possível gerenciar os arquivos de assinatura e PDF através de software automatizado.

    sudo chown -R www-data:www-data /var/www/

Em seguida, entre na pasta e clone este repositório:

    cd /var/www/html
    git clone https://github.com/mauricioeluri/assinador-pdf.git

### 3.3 Configuração da Assinatura

Para a geração de PDFs assinados, é necessário configurar o arquivo:

_assinador-pdf/app/signature/pyhanko.yml_

As configurações deste arquivo, dizem respeito à formatação da assinatura e demais configurações como a senha da assinatura digital. Há uma configuração prévia que foi carregada para demonstração. Para utilizá-la, basta renomear o arquivo pyhanko.yml.example e inserir a senha da sua assinatura digital.

Neste link é possível verificar a documentação oficial do pyHanko sobre este arquivo de configuração: [Configuration options — pyHanko 0.19.0-dev1 documentation](https://pyhanko.readthedocs.io/en/latest/cli-guide/config.html).

### 4 Outras informações - Assinaturas Digitais

Assinaturas digitais são arquivos com extensão .p12, que geralmente podem ser obtidos através de instituições certificadoras ou até o governo federal em alguns casos. Estudantes de universidades públicas podem baixar seu certificado digital ICPEdu através do link: [https://pessoal.icpedu.rnp.br](https://pessoal.icpedu.rnp.br/home).
