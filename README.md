# PDFWebSigner

Interface web intuitiva para posicionamento da estampa visual e assinatura digital de documentos PDF utilizando o [pyHanko](https://github.com/MatthiasValvekens/pyHanko).

## Passo-a-passo (utilização simples e rápida)

1. **Substituir** o arquivo do certificado PKCS#12 em **files/certificado/certificado.p12** (e.g., gerar um certificado .p12 [ICPEdu - Certificado Pessoal](https://pessoal.icpedu.rnp.br))
2. **Substituir** a senha do certificado PKCS#12 no arquivo **files/certificado/pyhanko.yml** (use o seu editor preferido)
```bash
$ vim files/certificado/pyhanko.yml
```
3. **Executar a aplicação** (instanciar container Docker e navegador):
```bash
$ ./pdfwebsigner.sh
```
    URL que será aberta no navegador: http://127.0.0.1:8888

4. Realizar o o **upload do PDF** a ser assinado na interface Web

5. Os **arquivos PDF assinados** estarão disponíveis no diretório **files/pdf**

## [Objetivos, Configuração, Instalação detalhada](https://github.com/WRSeg23/PDFWebSigner/blob/main/INSTALL.md)

