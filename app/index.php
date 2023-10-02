<?php

carregar_pagina();

function carregar_pagina() {
  $erros['assinatura'] = verifica_pyhanko_cfg();
  $erros['pdf'] = verificar_pdf();

  if(strlen($erros['assinatura']) > 0 || strlen($erros['pdf']) > 0) {
    require 'php/form.php';
  } else {
    if (isset($_FILES['pdf'])) { // Recebeu arquivo porém não houve erros
      $pdf = $_FILES['pdf'];
      $arquivo = salvar_pdf($pdf);
      if ($arquivo) {
        require 'php/editor.php';
      } else {
        $erros['pdf'] = encapsula_erros('Não foi possível salvar o arquivo PDF, 
        verifique as permissões da pasta de upload.');
        require 'php/form.php';
      }
    } else { // Não recebeu arquivo, carrega o formulário em branco
      require 'php/form.php';
    }
  }
}

/**
 * Função que encapsula os erros em uma div, caso existam.
 */
function encapsula_erros($erros){
  return (strlen($erros) > 0) ? '<div class="alerta">'.$erros.'</div>' : $erros;
}

/**
 * Função que verifica se os arquivos da assinatura estão na pasta.
 * 
 * Retorna uma string vazia se não houver erros.
 */
function verifica_pyhanko_cfg(){
  $erros = "";
  $assinatura = file_exists(getcwd().'/files/certificado.p12');
  $pyhanko_cfg = file_exists(getcwd() . '/files/pyhanko.yml');
  if (!$assinatura) {
    $erros = 'Arquivo do certificado PKCS#12 (certificado.p12) não encontrado.<br>';
  } 
  if (!$pyhanko_cfg) {
    $erros .= 'Arquivo de configuração do pyhanko (pyhanko.yml) não encontrado.';
  }
  return encapsula_erros($erros);
}

/**
 * Função que verifica se o arquivo PDF foi enviado e se é válido.
 * 
 * Retorna uma string vazia se não houver erros ou se o arquivo não tiver sido enviado.
 */
function verificar_pdf() {
  if (!isset($_FILES['pdf'])) return '';  
  $pdf = $_FILES['pdf'];
  if ($pdf['size'] <= 0) {
    return encapsula_erros("Você não enviou o arquivo PDF.");
  }
  if (strcmp($pdf['type'], 'application/pdf') != 0) {
    return encapsula_erros("Extensão não permitida. Por favor, envie um arquivo PDF.");
  }
  if ($pdf['size'] > 20000000) {
    return encapsula_erros('O arquivo excede o limite de 20MB.');
  }
  //Testando se o arquivo é um PDF válido
  $contents = file_get_contents($pdf['tmp_name']);
  if (!preg_match("/^%PDF-/", $contents)) {
    return encapsula_erros('Arquivo PDF inválido! Revise seu arquivo e tente novamente.');
  }
  return '';
} 

/**
 * Função que faz o upload do arquivo PDF.
 * Retorna o caminho do arquivo PDF ou FALSE, caso não consiga fazer o upload.
 */
function salvar_pdf($arquivo){
  // Cria o diretório upload, se ele não existir.
  if (!is_dir(getcwd() . '/upload/')) {
    mkdir(getcwd() . '/upload/');
  }

  // Gera um nome aleatório para o arquivo PDF.
  do {
    $nome = substr(md5(rand().rand()), 0, 8);
    $caminho = getcwd() . '/upload/' . $nome . '.pdf';
  } while (file_exists($caminho));

  $sucesso = move_uploaded_file($arquivo['tmp_name'], $caminho);
  if ($sucesso) {
    return $nome;
  } else {
    return false;
  }  
}
