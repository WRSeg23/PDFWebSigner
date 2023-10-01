<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['pdf']) && isset($_POST['coordenadas']) ) {
        if (!is_dir(getcwd() . '/../output')) {
            mkdir(getcwd() . '/../output');
        }
        $comando = 'python3 pyhanko --verbose --config ../signature/pyhanko.yml sign addsig --field Sig1 --field ' .
            $_POST['coordenadas'] . '/default pkcs12 --p12-setup p12dlk ../upload/' .
            $_POST['pdf'] . '.pdf ../output/' . $_POST['pdf'] . '.pdf';
            exec($comando, $output, $return_var);
        if ($return_var == 0) {
           header('Location: ../output/' . $_POST['pdf'] . '.pdf');
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