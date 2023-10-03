<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['pdf']) && isset($_POST['coordenadas']) ) {
        $comando = 'python3 pyhanko --verbose --config ../files/certificado/pyhanko.yml sign addsig --field Sig1 --field ' .
            $_POST['coordenadas'] . '/default pkcs12 --p12-setup p12dlk ../files/pdf/' .
            $_POST['pdf'] . '.pdf ../files/pdf/' . $_POST['pdf'] . '.pdf';
            exec($comando, $output, $return_var);
        if ($return_var == 0) {
           header('Location: ../files/pdf/' . $_POST['pdf'] . '.pdf');
        } else {
            echo "Houve um erro durante a geração do seu PDF.<br />
            Por favor, verifique se o seu arquivo de configuração do pyhanko está configurado corretamente.";
        }
    } else {
        echo "Por favor, reinicie a página e tente novamente.";
    }
} else {
    exit('Acesso direto não permitido');
}
