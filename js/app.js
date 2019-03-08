$(document).ready(function(){
  $(function(){
    setInterval(function(){
      var color = $(".main-titulo").css("color");
      if (color == "rgb(220, 255, 14)") {
        $(".main-titulo").css("color","white");
      }
      else {
        $(".main-titulo").css("color","rgb(220, 255, 14)");
      }
    },800);
  })
});

var rows = 7;
var cols = 1;
var grid = [];
//var divs = $(".panel-tablero");

//$(document).ready(function(){
//  $("div[name^='col']").css("background-color", "yellow");});

function candy(r,c,obj,src) {
  return {
    r: r,
    c: c,
    src:src,
    locked:false,
    isInCombo:false,
    o:obj
  };
}

var candyType = [];
candyType[0] = "image/1.png";
candyType[1] = "image/2.png";
candyType[2] = "image/3.png";
candyType[3] = "image/4.png";

function pickRandomCandy() {
  var pickInt = Math.floor((Math.random()*4));
  return candyType[pickInt];
}

//Columna 1

for (var r = 0; r < rows; r++) {
  grid[r] = [];

  for (var c = 0; c < cols; c++) {
    grid[r][c] = new candy(r,c,null,pickRandomCandy());
  }
}

var width = $(".col-1").width();
var height = $(".col-1").height();
var cellWidth = width / (cols+1);
var cellHeight = height / (rows+1);
var marginWidth = cellWidth / cols;
var marginHeight = cellHeight / rows;

for (var r = 0; r < rows; r++)
  {
    for (var c =0; c< cols; c++) {
      var cell = $("<img class='candy' id='candy_"+
      r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                 (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                 r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
      cell.attr("ondragstart","_ondragstart(event)");
      $(".col-1").append(cell);
      grid[r][c].o = cell;
    }
   }

//Columna 2

   for (var r = 0; r < rows; r++) {
     grid[r] = [];

     for (var c = 0; c < cols; c++) {
       grid[r][c] = new candy(r,c,null,pickRandomCandy());
     }
   }

   var width = $(".col-2").width();
   var height = $(".col-2").height();
   var cellWidth = width / (cols+1);
   var cellHeight = height / (rows+1);
   var marginWidth = cellWidth / cols;
   var marginHeight = cellHeight / rows;

   for (var r = 0; r < rows; r++)
     {
       for (var c =0; c< cols; c++) {
         var cell = $("<img class='candy' id='candy_"+
         r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                    (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                    r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
         cell.attr("ondragstart","_ondragstart(event)");
         $(".col-2").append(cell);
         grid[r][c].o = cell;
       }
      }

      //Columna 3

      for (var r = 0; r < rows; r++) {
        grid[r] = [];

        for (var c = 0; c < cols; c++) {
          grid[r][c] = new candy(r,c,null,pickRandomCandy());
        }
      }

      var width = $(".col-3").width();
      var height = $(".col-3").height();
      var cellWidth = width / (cols+1);
      var cellHeight = height / (rows+1);
      var marginWidth = cellWidth / cols;
      var marginHeight = cellHeight / rows;

      for (var r = 0; r < rows; r++)
        {
          for (var c =0; c< cols; c++) {
            var cell = $("<img class='candy' id='candy_"+
            r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                       (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                       r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
            cell.attr("ondragstart","_ondragstart(event)");
            $(".col-3").append(cell);
            grid[r][c].o = cell;
          }
         }

         //Columna 4

         for (var r = 0; r < rows; r++) {
           grid[r] = [];

           for (var c = 0; c < cols; c++) {
             grid[r][c] = new candy(r,c,null,pickRandomCandy());
           }
         }

         var width = $(".col-4").width();
         var height = $(".col-4").height();
         var cellWidth = width / (cols+1);
         var cellHeight = height / (rows+1);
         var marginWidth = cellWidth / cols;
         var marginHeight = cellHeight / rows;

         for (var r = 0; r < rows; r++)
           {
             for (var c =0; c< cols; c++) {
               var cell = $("<img class='candy' id='candy_"+
               r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                          (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                          r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
               cell.attr("ondragstart","_ondragstart(event)");
               $(".col-4").append(cell);
               grid[r][c].o = cell;
             }
            }

            //Columna 5

            for (var r = 0; r < rows; r++) {
              grid[r] = [];

              for (var c = 0; c < cols; c++) {
                grid[r][c] = new candy(r,c,null,pickRandomCandy());
              }
            }

            var width = $(".col-5").width();
            var height = $(".col-5").height();
            var cellWidth = width / (cols+1);
            var cellHeight = height / (rows+1);
            var marginWidth = cellWidth / cols;
            var marginHeight = cellHeight / rows;

            for (var r = 0; r < rows; r++)
              {
                for (var c =0; c< cols; c++) {
                  var cell = $("<img class='candy' id='candy_"+
                  r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                             (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                             r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
                  cell.attr("ondragstart","_ondragstart(event)");
                  $(".col-5").append(cell);
                  grid[r][c].o = cell;
                }
               }

               //Columna 6

               for (var r = 0; r < rows; r++) {
                 grid[r] = [];

                 for (var c = 0; c < cols; c++) {
                   grid[r][c] = new candy(r,c,null,pickRandomCandy());
                 }
               }

               var width = $(".col-6").width();
               var height = $(".col-6").height();
               var cellWidth = width / (cols+1);
               var cellHeight = height / (rows+1);
               var marginWidth = cellWidth / cols;
               var marginHeight = cellHeight / rows;

               for (var r = 0; r < rows; r++)
                 {
                   for (var c =0; c< cols; c++) {
                     var cell = $("<img class='candy' id='candy_"+
                     r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                                (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                                r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
                     cell.attr("ondragstart","_ondragstart(event)");
                     $(".col-6").append(cell);
                     grid[r][c].o = cell;
                   }
                  }

                  //Columna 7

                  for (var r = 0; r < rows; r++) {
                    grid[r] = [];

                    for (var c = 0; c < cols; c++) {
                      grid[r][c] = new candy(r,c,null,pickRandomCandy());
                    }
                  }

                  var width = $(".col-7").width();
                  var height = $(".col-7").height();
                  var cellWidth = width / (cols+1);
                  var cellHeight = height / (rows+1);
                  var marginWidth = cellWidth / cols;
                  var marginHeight = cellHeight / rows;

                  for (var r = 0; r < rows; r++)
                    {
                      for (var c =0; c< cols; c++) {
                        var cell = $("<img class='candy' id='candy_"+
                        r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                                   (cellWidth-20)+"px;height:"+cellHeight+"px;position:initial;top:"+
                                   r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
                        cell.attr("ondragstart","_ondragstart(event)");
                        $(".col-7").append(cell);
                        grid[r][c].o = cell;
                      }
                     }

function _ondragstart(a) {
 a.dataTransfer.setData("text/plain", a.target.id);
}

function _onDragOverEnabled(e) {
  e.preventDefault();
  console.log(e.target.id);
}

function _onDrop(e) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  if (isFirefox) {
    console.log("firefox compatibility");
    e.preventDefault();
  }

  var src = e.dataTransfer.getData("text");
  var sr = src.split("_")[1];
  var sc = src.split("_")[2];

  var dst = e.target.id;
  var dr = dst.split("_")[1];
  var dc = dst.split("_")[2];

  var ddx = Math.abs(parseInt(sr)-parseInt(dr));
  var ddy = Math.abs(parseInt(sc)-parseInt(dc));
  if (ddx > 1 || ddy > 1){
    console.log("Ni madre perro! distancia > 1");
    return;
  }

  var tmp = grid[sr][sc].src;
  grid[sr][sc].src = grid[dr][dc].src;
  grid[sr][sc].o.attr("src",grid[sr][sc].src);
  grid[dr][dc].src = tmp;
  grid[dr][dc].o.attr("src",grid[dr][dc].src);


  _checkAndDestroy();
}

function _checkAndDestroy(){

  for (var r = 0; r < rows; r++) {
    var prevCell = null;
    var figureLen = 0;
    var figureStart = null;
    var figureStop = null;

    for (var c = 0; c < cols; c++) {

      if (grid[r][c].locked || grid[r][c].isInCombo) {
        figureStart = null;
        figureStop = null;
        prevCell = null;
        figureLen = 1;
        continue;
      }

      if (prevCell == null) {
        prevCell = grid[r][c].src;
        figureStart = c;
        figureLen = 1;
        figureStop = null;
        continue;
      }else {
        var curCell = grid[r][c].src;

        if (!(prevCell == curCell)) {
          prevCell = grid[r][c].src;
          figureStart = c;
          figureLen = 1;
          figureStop = null;
          continue;
        }else {
          figureLen+=1;
          if (figureLen == 3) {
            validFigures+=1;
            figureStop = c;
            console.log("Combo from " + figureStart + " to " + figureStop + "!");
            for (var ci = figureStart; ci <= figureStop; ci++) {
              grid[r][ci].isInCombo = true;
              grid[r][ci].src = null;
            }
            prevCell = null;
            figureStart = null;
            figureStop = null;
            figureLen = 1;
            continue;

          }
        }
      }
    }
  }
}
