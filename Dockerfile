FROM  sf23/pdfwebsigner:latest
RUN rm -rf /var/www/html/*
ADD ./app /var/www/html
WORKDIR /pdfwebsigner
EXPOSE 80
