var PDFAnnotate = function (container_id, url, options = {}) {
  this.number_of_pages = 0;
  this.pages_rendered = 0;
  this.active_tool = 1; // 1 - Free hand, 2 - Text, 3 - Arrow, 4 - Rectangle
  this.fabricObjects = [];
  this.fabricObjectsData = [];
  this.color = "#212121";
  this.borderColor = "#000000";
  this.borderSize = 1;
  this.font_size = 16;
  this.active_canvas = 0;
  this.container_id = container_id;
  this.url = url;
  this.pageImageCompression = options.pageImageCompression
    ? options.pageImageCompression.toUpperCase()
    : "NONE";
  var inst = this;

  var loadingTask = pdfjsLib.getDocument(this.url);
  loadingTask.promise.then(
    function (pdf) {
      var scale = options.scale ? options.scale : 0.3;
      inst.number_of_pages = pdf.numPages;

      for (var i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          var viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement("canvas");
          document.getElementById(inst.container_id).appendChild(canvas);
          canvas.className = "pdf-canvas";
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          context = canvas.getContext("2d");

          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            $(".pdf-canvas").each(function (index, el) {
              $(el).attr("id", "page-" + (index + 1) + "-canvas");
            });
            inst.pages_rendered++;
            if (inst.pages_rendered == inst.number_of_pages) inst.initFabric();
          });
        });
      }
    },
    function (reason) {
      console.error(reason);
    }
  );

  this.initFabric = function () {
    var inst = this;
    let canvases = $("#" + inst.container_id + " canvas");

    canvases.each(function (index, el) {
      var background = el.toDataURL("image/png");
      var fabricObj = new fabric.Canvas(el.id, {
        freeDrawingBrush: {
          width: 1,
          color: inst.color,
        },
      });

      inst.fabricObjects.push(fabricObj);
      if (typeof options.onPageUpdated == "function") {
        fabricObj.on("object:added", function () {
          var oldValue = Object.assign({}, inst.fabricObjectsData[index]);
          inst.fabricObjectsData[index] = fabricObj.toJSON();
          options.onPageUpdated(
            index + 1,
            oldValue,
            inst.fabricObjectsData[index]
          );
        });
      }
      fabricObj.setBackgroundImage(
        background,
        fabricObj.renderAll.bind(fabricObj)
      );
      $(fabricObj.upperCanvasEl).click(function (event) {
        inst.active_canvas = index;
        inst.fabricClickHandler(event, fabricObj);
        if ($(".nkar").attr("ar-ativo") == "1") {
          attSignatureVal(fabricObj._objects[0], index);
        }
      });
      fabricObj.on("after:render", function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
        fabricObj.off("after:render");
      });

      if (
        index === canvases.length - 1 &&
        typeof options.ready === "function"
      ) {
        options.ready();
      }
    });
  };

  // Click add Text
  this.fabricClickHandler = function (event, fabricObj) {
    var inst = this;
    if (inst.active_tool == 2) {
      var text = new fabric.IText("Exemplo de texto", {
        left:
          event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top:
          event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
        fill: inst.color,
        fontSize: inst.font_size + 15,
        selectable: true,
      });
      fabricObj.add(text);
      inst.active_tool = 0;
    } else if (inst.active_tool == 3) {
      let image = new Image();
      image.src = "assets/img/assinatura.png";
      var imgElement = document.querySelector(".nkar");
      let imgCheck = new fabric.Image(imgElement, {
        left:
          event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top:
          event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
      });
      imgCheck.controls = {
        ...fabric.Text.prototype.controls,
        mtr: new fabric.Control({ visible: false }),
      };
      fabricObj.add(imgCheck);
      enableSelector(event);
      $(".nkar").attr("ar-ativo", "1");
      $(".fa-trash").prop("disabled", false);
      $(".fa-signature").prop("disabled", true);
      $(".fa-check").prop("disabled", false);
    }
  };
};

this.attSignatureVal = function (fabricObj, index) {
  var coordenadas = {
    pag: index + 1,
    esq: Math.floor(fabricObj["aCoords"]["bl"]["x"]),
    bai: Math.floor(Math.abs(fabricObj["aCoords"]["bl"]["y"] - 595)),
    dir: Math.floor(fabricObj["aCoords"]["tr"]["x"]),
    cim: Math.floor(Math.abs(fabricObj["aCoords"]["tr"]["y"] - 595)),
  };

  /* $("#ar-pyh").text(
    `Info sobre a assinatura:
    Pág: ${coordenadas.pag}.
    Esq: ${coordenadas.esq}.
    Bai: ${coordenadas.bai}.
    Dir: ${coordenadas.dir}.
    Cim: ${coordenadas.cim}.`
  ); */
  $("#coordenadas").val(
    `${coordenadas.pag}/${coordenadas.esq},${coordenadas.bai},${coordenadas.dir},${coordenadas.cim}`
  );
};

PDFAnnotate.prototype.enableSelector = function () {
  var inst = this;
  inst.active_tool = 0;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

PDFAnnotate.prototype.enablePencil = function () {
  var inst = this;
  inst.active_tool = 1;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = true;
    });
  }
};

PDFAnnotate.prototype.enableAddText = function () {
  var inst = this;
  inst.active_tool = 2;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};
PDFAnnotate.prototype.enableImageCheck = function () {
  var assinatura = $(".nkar").attr("ar-ativo");

  if (assinatura != "1") {
    var inst = this;
    inst.active_tool = 3;
    if (inst.fabricObjects.length > 0) {
      $.each(inst.fabricObjects, function (index, fabricObj) {
        fabricObj.isDrawingMode = false;
      });
    }
  }
};

PDFAnnotate.prototype.enableRectangle = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];
  inst.active_tool = 4;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }

  var rect = new fabric.Rect({
    width: 100,
    height: 100,
    fill: inst.color,
    stroke: inst.borderColor,
    strokeSize: inst.borderSize,
  });
  fabricObj.add(rect);
};

PDFAnnotate.prototype.enableAddArrow = function () {
  var inst = this;
  inst.active_tool = 3;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
      new Arrow(fabricObj, inst.color, function () {
        inst.active_tool = 0;
      });
    });
  }
};

PDFAnnotate.prototype.addImageToCanvas = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];

  if (fabricObj) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".jpg,.jpeg,.png,.PNG,.JPG,.JPEG";
    inputElement.onchange = function () {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          inputElement.remove();
          var image = new Image();
          image.onload = function () {
            fabricObj.add(new fabric.Image(image));
          };
          image.src = this.result;
        },
        false
      );
      reader.readAsDataURL(inputElement.files[0]);
    };
    document.getElementsByTagName("body")[0].appendChild(inputElement);
    inputElement.click();
  }
};

PDFAnnotate.prototype.addImageToCanvasCustom = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];
  if (fabricObj) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".jpg,.jpeg,.png,.PNG,.JPG,.JPEG";
    function addInputImage() {
      var reader = new FileReader();
      inputElement.remove();
      var image = new Image();
      image.onload = function () {
        fabricObj.add(new fabric.Image(image));
      };
      image.src = "assets/img/assinatura.png";
      inputElement.files[0];
    }
    document.getElementsByTagName("body")[0].appendChild(inputElement);
    addInputImage();
  }
};
// Signature
PDFAnnotate.prototype.addImageToCanvasSign = function (data) {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];
  if (fabricObj) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".png,.PNG";
    function addInputImage() {
      var reader = new FileReader();
      inputElement.remove();
      var image = new Image();
      image.onload = function () {
        fabricObj.add(new fabric.Image(image));
      };
      image.src = data;
      reader.readAsDataURL(inputElement.files[0]);
    }
    document.getElementsByTagName("body")[0].appendChild(inputElement);
    addInputImage();
  }
};

//PDFAnnotate.prototype.generateCode = function () {};

PDFAnnotate.prototype.deleteSelectedObject = function () {
  var inst = this;
  var activeObject = inst.fabricObjects[inst.active_canvas].getActiveObject();
  if (activeObject) {
    if (confirm("Você tem certeza?"))
      inst.fabricObjects[inst.active_canvas].remove(activeObject);
    $(".nkar").attr("ar-ativo", "0");
    $(".fa-trash").prop("disabled", true);
    $(".fa-signature").prop("disabled", false);
    //$(".fa-code").prop("disabled", true);
    $(".fa-check").prop("disabled", true);
    $(".fa-hand").addClass("active");
  }
};

//Função nova de enviar um request por ajax
PDFAnnotate.prototype.setBrushSize = function (size) {
  var inst = this;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    fabricObj.freeDrawingBrush.width = size;
  });
};

PDFAnnotate.prototype.setColor = function (color) {
  var inst = this;
  inst.color = color;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    fabricObj.freeDrawingBrush.color = color;
  });
};

PDFAnnotate.prototype.setBorderColor = function (color) {
  var inst = this;
  inst.borderColor = color;
};

PDFAnnotate.prototype.setFontSize = function (size) {
  this.font_size = size;
};

PDFAnnotate.prototype.setBorderSize = function (size) {
  this.borderSize = size;
};

PDFAnnotate.prototype.clearActivePage = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];
  var bg = fabricObj.backgroundImage;
  if (confirm("Você tem certeza?")) {
    fabricObj.clear();
    fabricObj.setBackgroundImage(bg, fabricObj.renderAll.bind(fabricObj));
  }
};

PDFAnnotate.prototype.serializePdf = function () {
  var inst = this;
  return JSON.stringify(inst.fabricObjects, null, 4);
};

PDFAnnotate.prototype.loadFromJSON = function (jsonData) {
  var inst = this;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    if (jsonData.length > index) {
      fabricObj.loadFromJSON(jsonData[index], function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
      });
    }
  });
};
