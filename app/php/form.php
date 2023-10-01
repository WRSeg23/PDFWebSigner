<?php if(count(get_included_files()) == 1)exit('Acesso direto não permitido')?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" type="image/x-icon" href="assets/img/ico.png">
    <title>PDFWebSigner</title>
    <link rel="stylesheet" href="assets/form.css">
  </head>
  <body>
    <h1>PDFWebSigner<span>Assinador de documentos PDF com assinatura eletrônica.</span></h1>
    <?php
    if($erros['assinatura'] != '') {
      echo $erros['assinatura'];
    } else { ?>
      <form method="POST" id="form" enctype="multipart/form-data">
        <br>
        <div class="custom-file-upload">
          <label for="pdf">Arquivo PDF: </label>
          <input type="file" name="pdf" id="pdf" accept="application/pdf">
        </div>
        <br><br>
        <?=$erros['pdf']?>
        <br>
        <input type="submit" class="file-upload-button submit" value="Enviar">
      </form>
    <?php } ?>
    <script src="assets/tools/jquery-3.5.1.min.js"></script>
    <script src="assets/form.js"></script>
  </body>
</html>