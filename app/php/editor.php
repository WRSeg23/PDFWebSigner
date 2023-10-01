<?php if(count(get_included_files()) == 1)exit('Acesso direto não permitido')?>
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/ico.png">
        <title>Editor do Assinador de PDF</title>
        <link rel="stylesheet" href="assets/tools/bootstrap-4.4.1.min.css">
        <link rel="stylesheet" href="assets/tools/fontawesome-6.4.0.min.css">
        <link rel="stylesheet" href="assets/tools/fontawesome-6.4.0-solid.min.css">
        <link rel="stylesheet" href="assets/editor.css">
        <link rel="stylesheet" href="assets/tools/pdfannotate.css">
    </head>
    <body>
        <nav class="navbar navbar-expand-md navbar-fixed-top sticky-top navbar-dark bg-dark main-nav">
            <button class="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target=".nav-content"
            aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <span class="navbar-brand mb-0 ml-5"> Editor do Assinador de PDF</span>
            <div class="container ml-0">
                <div class="navbar-collapse collapse nav-content tool nav-link nav-item"></div>
                <ul class="nav navbar-nav navbar-collapse nav-content collapse text-nowrap flex-row mx-md-auto order-1 order-md-2">
                    <li class="nav-item">
                        <div class="btn-group btn-group-lg" role="group" aria-label="Ferramentas de edição">
                            <button type="button" class="btn btn-outline-light fa-solid fa-hand tool-button"
                            title="Posicionar assinatura" onclick="enableSelector(event)" disabled></button>
                            <button type="button" class="btn btn-outline-light fa-solid fa-signature tool-button"
                            title="Inserir assinatura" onclick="enableImageCheck(event)" disabled></button>
                            <button type="button" class="btn btn-outline-light fa-solid fa-trash text-danger tool-button"
                            title="Remover assinatura" onclick="deleteSelectedObject(event)" disabled></button>
                        </div>
                    </li>
                </ul>
                <div class="ml-auto navbar-collapse collapse nav-content order-2 order-md-3">
                    <ul class="ml-auto nav navbar-nav">
                        <li class="nav-item">
                            <form class="form-inline" id="form-data" method="POST" action="php/pyhanko.php">
                                <input type="hidden" name="pdf" id="pdf-inp" value="<?=$arquivo?>">
                                <input type="hidden" name="coordenadas" id="coordenadas">
                                <div class="position absolute end-0" role="group" aria-label="Gerador">
                                <!-- btn-group  -->    
                                <!--button type="button" class="btn btn-outline-light fa-solid fa-code"
                                    onclick="showCode(event)" disabled> Codigo</button -->
                                    <button type="button" class="btn btn-outline-light fa-solid fa-check btn-md"
                                    onclick="signPdf(event)" disabled> Assinar</button>
                                </div>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="pdf-container"></div>
        <div class="modal fade" id="dataModalSign" tabindex="-1" role="dialog" aria-labelledby="dataSignature" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dataSignature">Signature</h5>
                    </div>
                    <div class="modal-body">
                        <div class="signature-wrapper">
                            <canvas id="signature-pad" class="signature-pad" width="500" height="200" style="max-width: 500px;"></canvas>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="save-png" data-dismiss="modal" aria-label="Close">Add</button>
                        <button id="clear">Clear</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tool">
            <img src="assets/img/assinatura.png" alt="Assinatura" class="nkar" hidden ar-ativo="0">
        </div>
        <script src="assets/tools/jquery-3.5.1.min.js"></script>
        <script src="assets/tools/bootstrap-4.5.2.min.js"></script>
        <script src="assets/tools/pdf-2.6.347.min.js"></script>
        <script>
            pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/tools/pdf.worker-2.6.347.min.js";
        </script>
        <script src="assets/tools/fabric-4.3.0.min.js"></script>
        <script src="assets/tools/sweetalert.min.js"></script>
        <script src="assets/pdfannotate.js"></script>
 
        <!-- JS do Editor. Precisa ser carregado por último para calcular o tamanho da tela do editor de PDF -->
        <script src="assets/editor.js"></script>

        <!-- FERRAMENTAS QUE PODEM DAR MAIS FUNÇÕES PARA O PDF. FORAM REMOVIDOS PARA SIMPLIFICAR A VERSÃO ATUAL -->

        <!-- Script para desenhar assinatura -->
        <!--script src="assets/tools/signature_pad.umd.js"></script-->

        <!--script src="assets/tools/popper-1.16.1.min.js"></script-->
        <!--script src="assets/tools/jspdf.umd-2.2.0.min.js"></script-->
        <!--script src="assets/tools/run_prettify.js"></script-->
        <!--script src="assets/tools/prettify-r298.min.js"></script-->
        <!--script src="assets/tools/arrow.fabric.js"></script-->
    </body>
</html>