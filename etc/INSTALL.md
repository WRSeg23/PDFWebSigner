# PDFWebSigner

Interface web intuitiva para posicionamento de assinatura digital e geração de PDFs assinados com pyHanko.

## 1. Objetivos

Software desenvolvido em PHP e Javascript, que faz uso da biblioteca pyHanko, do Python para a geração de arquivos assinados digitalmente. Possui um editor intuitivo que permite a seleção do local de inserção da assinatura no documento PDF.

## 2. Forma de uso

Ma primeira tela é possível carregar o arquivo PDF que será utilizado.
Depois, basta clicar em enviar e em seguida selecionar o local onde a assinatura será salva. Também é possível ajustar o tamanho da caixa da assinatura, e clicar em assinar, onde será redirecionado para o arquivo PDF assinado.

## 3. Configurações

Este software requer uma máquina linux para ser instalado. Podendo ser instalado na máquina virtual, ou em um container Docker.
Para instalação manual, pule para o item 3.2;

### 3.1 Instalação Docker

Certifique-se de ter o Docker instalado e rodando. Em seguida, é necessário clonar este respositório para a pasta desejada.

O usuário pode utilizar o script ./pdfwebsigner.sh para informar o diretório (ou volume) compartilhado que contém o arquivo de configuração do pyHanko e o certificado digital e instanciar um container Docker do PDFWebSigner.

O usuário necessita configurar o arquivo do pyHanko uma única vez, informando o caminho do certificado digital e a senha (e.g., parâmetro pfx-passphrase) necessária para realizar a assinatura digital. Atualmente, por questões de simplicidade e praticidade, a senha fica armazenada no arquivo de configuração do pyHanko. 


O script ./pdfwebsigner.sh irá tentar detectar e abrir automaticamente um navegador apontando para a URL do container Docker.

Pronto! Caso a url não seja aberta automaticamente, é possível acessar a aplicação através do endereço: http://127.0.0.1:8888.


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
    git clone https://github.com/WRSeg23/PDFWebSigner.git

### 3.3 Configuração da Assinatura

Para a geração de PDFs assinados, é necessário configurar o arquivo:

_assinador-pdf/app/signature/pyhanko.yml_

As configurações deste arquivo, dizem respeito à formatação da assinatura e demais configurações como a senha da assinatura digital. Há uma configuração prévia que foi carregada para demonstração. Para utilizá-la, basta renomear o arquivo pyhanko.yml.example e inserir a senha da sua assinatura digital.

Neste link é possível verificar a documentação oficial do pyHanko sobre este arquivo de configuração: [Configuration options — pyHanko 0.19.0-dev1 documentation](https://pyhanko.readthedocs.io/en/latest/cli-guide/config.html).

### 4 Outras informações - Assinaturas Digitais

Assinaturas digitais são arquivos com extensão .p12, que geralmente podem ser obtidos através de instituições certificadoras ou até o governo federal em alguns casos. Estudantes de universidades públicas podem baixar seu certificado digital ICPEdu através do link: [https://pessoal.icpedu.rnp.br](https://pessoal.icpedu.rnp.br/home).
