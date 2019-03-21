$(document).ready(function () {

  $(".fin").hide();

  var $game = $('#tablero');
  var $ui = $('.data-info');

  $('.btn-reinicio').on('click', function(event) {
		event.preventDefault();

    if($(".btn-reinicio").text().match("Iniciar")) {
      var value = 7;
      newGame = new Game();
      newGame.init(value, $game, $ui);

      $(".btn-reinicio").text("Reiniciar");

    }else if ($(".btn-reinicio").text().match("Reiniciar")) {
      location.reload();
    }

	});

    $(function () {
        setInterval(function () {
            var color = $(".main-titulo").css("color");
            if (color == "rgb(220, 255, 14)") {
                $(".main-titulo").css("color", "white");
            } else {
                $(".main-titulo").css("color", "rgb(220, 255, 14)");
            }
        }, 800);
    })


});

var newGame;

var Game = function() {

  this.init = function(size, base, ui) {
    $( ".row" ).removeClass();

    this.base = base;
    this.ui = ui;
    this.originalSize = size;
    this.size = this.originalSize * this.originalSize;
    this.caseHeight = base.height() / this.originalSize;
    this.level = [];
    this.typesOfCandys = 3;
    this.fillEnd = true;
    this.switchEnd = true;
    this.playerCanControl = false;
    this.populateLevel();
    this.drawNewLevel();
    this.score = 0;
    this.move = 0;

    setTimeout($.proxy(this.checkLines, this), 500);
  };

  this.releaseGameControl = function(play) {
    if (play) {
      this.playerCanControl = true;
    }else {
      this.playerCanControl = false;
    }
  };

  this.bindDraggableEvent = function() {
    var that = this;
    var position;

    this.base.hammer().on('dragleft dragright dragup dragdown', '.row', function(event) {


      position = +$(this).attr('data-id');

      if (position !== undefined) {
        that.testMove(position, event.type);
        return;
      }
    });
  };

  this.testMove = function(position, direction) {
    switch(direction) {
      case "dragleft":
         if (position % this.originalSize !== 0) {
           this.swipeCandys(this.base.find('.row[data-id='+position+']'), position, this.base.find('.row[data-id='+(position - 1)+']'), position - 1);

         }
      break;

      case "dragright":
         if (position % this.originalSize !== this.originalSize - 1) {
           this.swipeCandys(this.base.find('.row[data-id='+position+']'), position, this.base.find('.row[data-id='+(position + 1)+']'), position + 1);

         }
      break;

      case "dragup":
          this.swipeCandys(this.base.find('.row[data-id='+position+']'), position, this.base.find('.row[data-id='+(position - this.originalSize)+']'), position - this.originalSize);

      break;

      case "dragdown":
          this.swipeCandys(this.base.find('.row[data-id='+position+']'), position, this.base.find('.row[data-id='+(position + this.originalSize)+']'), position + this.originalSize);

      break;
    }
  };

  this.swipeCandys = function(a, aID, b, bID) {

    if (this.switchEnd && a !== undefined && b !== undefined && aID >= 0 && bID >= 0 && aID <= this.size && bID <= this.size) {

      var that = this;
      var aTop = a.css('top');
      var aLeft = a.css('left');
      var bTop = b.css('top');
      var bLeft = b.css('left');
      var aType = this.level[aID];
      var bType = this.level[bID];

      this.switchEnd = false;

      this.level[aID] = bType;
      this.level[bID] = aType;

      this.move = this.move + 1;
      $('#movimientos').text(this.move);

      a.attr('data-id', bID).animate({
        top: bTop,
        left: bLeft
      },250);

      b.attr('data-id', aID).animate({
        top: aTop,
        left: aLeft
      },250, function() {
        that.switchEnd = true;
        that.checkLines();
      });
    }
  };

  this.populateLevel = function() {
    var i;
    for (i = 0; i < this.size; i++) {

      this.level[i] = Math.round(Math.random() * this.typesOfCandys +1);
    }
  };

  this.drawNewLevel = function() {
    var i;
    var row = $(document.createElement('div'));
    var lines = -1;

    $('.row').remove();

    for (i = 0; i < this.size; i++){

      if (i % this.originalSize === 0) {
        lines++;
      }

      row.css({
        top: lines * this.caseHeight,
        left: i % this.originalSize * this.caseHeight,
        height: this.caseHeight,
        width: this.caseHeight
      }).attr({
        "class": 'type-' + this.level[i] + ' row',
        "data-id": i
      });

      this.base.append(row.clone());
    }

    this.lines = lines + 1;
    this.itemByLine = this.size / this.lines;

    this.bindDraggableEvent();
    this.releaseGameControl(true);
  };

  this.checkLines = function() {
    var k;
    var counter = 0;

    this.base.find('.row').removeClass('.glow');

    for (var k = 0; k < this.size; k++) {
      counter = counter + this.checkCandyAround(this.level[k], k);
    }

    if (counter === this.size) {
      this.releaseGameControl(true);
      return true;


    }else {
      this.releaseGameControl(false);
      return false;

    }
  };

  this.checkCandyAround = function(candyType, position) {
    var flag = false;

    if (this.level[position - 1] === candyType && this.level[position +1] === candyType && (position + 1) % this.lines !== 0 && position % this.lines) {
      this.removeClearedCandyToLevel([position, position - 1, position + 1]);
    }else {
      flag = true;
    }

    if (this.level[position - this.itemByLine] === candyType && this.level[position + this.itemByLine] === candyType) {
      this.removeClearedCandyToLevel([position - this.itemByLine, position, position + this.itemByLine]);
    }else {
      flag = true;
    }

    if (flag) {
      return 1;
    }else {
      return 0;
    }
  };

  this.removeClearedCandyToLevel = function(candyToRemove) {
    var i;

    for (i = 0; i < candyToRemove.length; i++) {
      this.level[candyToRemove[i]] = 0;
      this.animateRemoveCandy(candyToRemove[i]);
    }


  };

  this.animateRemoveCandy = function(position) {
    var that = this;

    var difference = this.caseHeight / 2;

    this.base.find('.row[data-id='+position+']')
    .attr('data-id', false)
    .addClass('glow').animate({
      marginTop: difference,
      marginLeft: difference,
      height: 0,
      width: 0
    }, 500, function(){
      $(this).remove();
      that.scoreUpdate(100);

    });

    if (that.fillEnd) {
      that.fillHoles();
    }
  };

  this.moveCandy = function(position, line, colPosition, destination) {
    var that = this;

    this.base.find('.row[data-id='+position+']').animate({
      top: Math.abs(line * that.caseHeight)
    }, 100, "swing").attr('data-id', destination);

    this.level[destination] = this.level[position];
    this.level[position] = 0;

    if(line === 1) {
      this.createNewRandomCandy(colPosition);
    }
  };


  this.createNewRandomCandy = function(colPosition) {

    var that = this;
    var candy = $(document.createElement('div'));

    this.level[colPosition] = Math.round(Math.random() * this.typesOfCandys + 1);

    candy.addClass('type-' + this.level[colPosition] +' row').css({
      top: -this.caseHeight,
      left: colPosition * this.caseHeight,
      height: this.caseHeight,
      width: this.caseHeight,
      opacity: 0
    }).attr({
      "data-id": colPosition
    });

    candy.appendTo(this.base);

    candy.animate({
      top: 0,
      opacity: 1
    },100);

    this.bindDraggableEvent();
  };

  this.fillHoles = function() {

    var i;
    var counter = 0;

    this.releaseGameControl(false);

    this.fillEnd = false;

    for (var i = 0; i < this.level.length; i++) {

      var under = i + this.originalSize;
      var lignePosition = Math.floor(under / this.originalSize);
      var colPosition = under - Math.floor(lignePosition * this.originalSize);

      if (this.level[under] === 0 && this.level[i] !== 0) {

        if (this.level[under] === 0 && this.level[under] !== undefined) {
          this.moveCandy(i, lignePosition, colPosition, under);
        }

        break;

      }else if (this.level[i] === 0) {
        this.createNewRandomCandy(colPosition);
      }else if (this.level[i] !== 0) {
        counter++;
      }
    }

    if (this.level.length === counter) {

      this.fillEnd = true;
      return setTimeout($.proxy(this.checkLines, this), 50);
    }else {
      return setTimeout($.proxy(this.fillHoles, this), 50);
    }
  };

  this.scoreUpdate = function(score) {
    this.score = Math.floor(this.score + score / 10);
    $('#score').text(this.score);
  };

  this.moveUpdate = function(move) {
    if (moveUpdate = true) {


    }else {
      this.move = 0;
    }

  }

  $(function () {
    var seconds = 59;
    var minutes = 1;
    var final = 0;


    setInterval(function () {

      $("#minutos").text("0"+minutes+ ":" + seconds);
      seconds--;


      if (seconds <= -1) {
        minutes = 0;
        seconds = 59;
        final++;
        $("#minutos").text("0"+minutes+ ":" + seconds);
      }

      if (seconds <= 9) {
        $("#minutos").text("0"+minutes+ ":" + "0" + seconds);
      }

      if (final >= 2) {

        console.log("hola");
        seconds = 0;

        $("#tablero").hide("slow");
        $("#minutos").text("0"+minutes+ ":" + "0" + seconds);
        $(".panel-score").css({
          "width": "100%",
        });
        $(".fin").show();

      }
    }, 500);
  })
}
