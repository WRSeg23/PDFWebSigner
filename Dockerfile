FROM  sf23/pdfwebsigner:latest

ARG DEBIAN_FRONTEND=noninteractive
ARG DEBCONF_NOWARNINGS=yes

RUN apt-get update -qq
RUN apt upgrade -y
RUN apt-get install -y wget vim net-tools

RUN rm -rf /var/www/html/*
ADD ./app /var/www/html
WORKDIR /var/www/html

EXPOSE 80
