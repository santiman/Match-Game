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

$(".btn-reinicio").click(function(){
  _executeDestroy();
})

var rows = 7;
var cols = 7;
var grid = [];

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

for (var r = 0; r < rows; r++) {
  grid[r] = [];

  for (var c = 0; c < cols; c++) {
    grid[r][c] = new candy(r,c,null,pickRandomCandy());
  }
}

var width = $("#tablero").width();
var height = $("#tablero").height();
var cellWidth = width / (cols-1);
var cellHeight = height / rows;
var marginWidth = cellWidth / cols;
var marginHeight = cellHeight / rows;

for (var r = 0; r < rows; r++)
  {
    for (var c =0; c< cols; c++) {
      var cell = $("<img class='candy' id='candy_"+
      r+"_"+c+"' r='"+r+"' c='"+c+"'ondrop='_onDrop(event)' ondragover='_onDragOverEnabled(event)'src='"+grid[r][c].src+"' style='padding-right:20px;width:"+
                 (cellWidth-20)+"px;height:"+cellHeight+"px;top:"+
                 r*cellHeight+"px;left:"+(c*cellWidth+marginWidth)+"px'/>");
      cell.attr("ondragstart","_ondragstart(event)");
      $("#tablero").append(cell);
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

  console.log("Seeee");
  _checkAndDestroy();
  _executeDestroy();
}

function _checkAndDestroy(){
console.log("sii");
  for (var r = 0; r < rows; r++) {
    var prevCell = null;
    var figureLen = 0;
    var figureStart = null;
    var figureStop = null;
    var validFigures = 0;

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
          if (figureLen <= 3) {
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
            _executeDestroy();
          }
        }
      }
    }
  }
}

function _executeDestroy()
             { console.log("hehehehe");
                  for (var r=0;r<rows-1;r++)
                      for (var c=0;c<cols-1;c++)
                          if (grid[r][c].isInCombo)
                          {
                              grid[r][c].o.animate({
                                  opacity:0
                              },500);
                          }

                 $(":animated").promise().done(function() {
                      _executeDestroyMemory();
                });
             }

             function _executeDestroyMemory() {

                  for (var r=0;r<rows-1;r++)
                  {
                      for (var c=0;c<cols-1;c++)
                      {
                          if (grid[r][c].isInCombo)
                          {
                              grid[r][c].o.attr("src","")

                              grid[r][c].isInCombo=false;

                              for (var sr=r;sr>=0;sr--)
                              {
                                  if (sr==0) break;
                                  if (grid[sr-1][c].locked)
                                      break; // cannot shift. my top is locked

                                      // shift cell
                                      var tmp = grid[sr][c].src;
                                        grid[sr][c].src=grid[sr-1][c].src;
                                    grid[sr-1][c].src=tmp;

                              }
                          }
                      }
                 }

                     console.log("End of movement");

                       //redrawing the grid
                       // and setup respaw

                       //Reset all cell
                    for (var r=0;r<rows-1;r++)
                     {    for (var c = 0;c<cols-1;c++)
                         {
                             grid[r][c].o.attr("src",grid[r][c].src);
                             grid[r][c].o.css("opacity","1");
                             grid[r][c].isInCombo=false;
                             if (grid[r][c].src==null)
                                 grid[r][c].respawn=true;
                              // if respawn is needed
                              if (grid[r][c].respawn==true)
                             {
                                 grid[r][c].o.off("ondragover");
                                 grid[r][c].o.off("ondrop");
                                 grid[r][c].o.off("ondragstart");

                                 grid[r][c].respawn=false; // respawned!
                                 console.log("Respawning " + r+ "," + c);
                                 grid[r][c].src=pickRandomCandy();
                                 grid[r][c].locked=false;
                                 grid[r][c].o.attr("src",grid[r][c].src);
                                 grid[r][c].o.attr("ondragstart","_ondragstart(event)");
                                 grid[r][c].o.attr("ondrop","_onDrop(event)");
                                 grid[r][c].o.attr("ondragover","_onDragOverEnabled(event)");

                             }
                         }
                     }

                     console.log("jewels resetted and rewpawned");

                     // check for other valid figures
                     _checkAndDestroy();
             }
