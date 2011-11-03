//---------------------------------------------------------
// Grid's functions
var Grid = function(size){
	this.size = size;
	this.cells = [];

		populate: function(){
			for(var y = 0; y < this.height; ++y){
				for(var x = 0; x < this.width; ++x){
					this.setFieldAt(x, y, new Field());
				}
			}
		},	

		getFieldAt: function(x, y){
			return this.cells[y * this.width + x];	
		},
		
		setFieldAt: function(x, y, field){
			this.cells[y * this.width + x] = field;
		},

		each: function(action){
			for(var y = 0; y < this.height; ++y){
				for(var x = 0; this.width; ++x){
					action(x, y, this.getFieldAt(x, y));
				}
			}
		},

		addTo: function(fieldX, fieldY, coords){
			return [fieldY + coords[1], fieldX + coords[0]];
		};
};
//---------------------------------------------------------
// Field's functions
var Field = function(color){
	this.color = colorsEnum.empty;

	setColor: function(color){
		this.color = color;
	},

	getColor: function(){
		return this.color;		
	};

};

var colorsEnum = {black:1, white:2, empty:3};
Object.freeze(colorsEnum);

//---------------------------------------------------------
// Player's functions

var Player = function(id, color){
	this.id = id;
	this.color = color;
	this.score = 0;
  this.legalMoves = [];
};

//---------------------------------------------------------
// Game's functions

var Game = function(size){
	this.players = [];
	this.grid = new Grid(size);
  this.pass = false;  
  this.currentPlayer = {};
	
	initialise: function(size){
		this.grid.getFieldAt(grid.width/2, grid.height/2).setColor(colorsEnum.white);
		this.grid.getFieldAt(grid.width/2+1, grid.height/2+1).setColor(colorsEnum.white);
		this.grid.getFieldAt(grid.width/2+1, grid.height/2).setColor(colorsEnum.black);
		this.grid.getFieldAt(grid.width/2, grid.height/2+1).setColor(colorsEnum.black);
	},

	play: function(){
		var i = 0;
		while(!isGameFinished()){
			this.makeMove(grid,players[i]);
			//alert(this.toString);
			//alert(this.printScore);
			i = (i+1)%2;
		}
	//alert("Game is over./n")
	//alert(this.printScore);
	},
	
	printScore: function(){
		return "The score is: player 1 (" + players[0].score + 
		") and player 2 (" + players[1].score + "/n";
	},

  isGameFinished: function(){
	  if(this.currentPlayer.legalMoves === []){   // === compares types and values
       if(this.pass == false) return true;
       return false;
    }
    return true;
  },

	toString: function() {
		var characters = [];
		var endOfLine = this.grid.width - 1;
		this.grid.each(function(x, y, value){
			characters.push(characterFromElement(value));
			if(x == endOfLine)
				characters.push("\n");
		});
		return characters.join("");
	},

	makeMove: function(grid, player){
		var move = "";//prompt("What's your next move, busy lady?(type in the coordinates in format 'width height' ", "");
		var coords = convertInput(move);
		checkIfLegal(coords, grid, player);
		updateGrid(coords, grid);
	};
};

//---------------------------------------------------------
// Other functions (maybe prototype methods)

function checkIfLegal(coords, grid, player){
	var x = coords[0], y = coords[1], legalMoves = [],tilesToChange = [], localColor, state = [];
	
	var advance = function(){
			state = grid.addTo(x,y, value);
			localColor = grid.getFieldAt(x,y).getColor;
	};

	grid.each(forEachIn(directions, function(direction, value) = {
			advance();
			if(localColor!=player.getColor && localColor != colorsEnum.empty){
				advance();
				while(localColor != player.getColor && state[0]<grid.size && state[1]<grid.size){
					if(localColor == player.getColor){
						legalMoves.push([coords[0],coords[1],tilesToChange]);
					}
					if(localColor != colorsEnum.empty){
						tilesToChange.push([state[0],state[1]]);
					}
					if(localColor == colorsEnum.empty){
						break;
					}
					advance();
				}
				tilesToChange.clear;
			}
	}));
	return legalMoves;
}



var directions = new Dictionary(
	{"n": [0, -1],
	"ne": [1, -1],
	"e":  [1, 0],
	"se": [1, 1],
	"s": [0, 1],
	"sw": [-1, 1],
	"w": [-1, 0],
	"nw": [-1, -1]});


function updateGrid(coords, grid){
	
}



function convertInput(move){
	var coords = [];
	coords.push(move.charAt(0));
	coords.push(move.charAt(2));
	return coords;
}

function characterFromElement(element){
	if(element.color == undefined)
		return '_';
	else if (element.color == black)
		return 'x';
	else
		return 'o';
}

var Dictionary = function(startValues) {
	this.values = startValues || {};

	store: function(name, value) {
		this.values[name] = value;
	},

	lookup: function(name) {
		return this.values[name];
	},

	contains: function(name) {
		return Object.prototype.propertyIsEnumerable.call(this.values, name);
	},
	each: function(action) {
		forEachIn(this.values, action);
	},

	forEachIn: function(object, action) {
		for (var property in object) {
			if (Object.prototype.hasOwnProperty.call(object, property))
				action(property, object[property]);
	}
	};
};

///////////////////////////////////////////////////////////
// main //

var main = function(){
	while(1){
		var size=8;// = prompt("Could you enter the size of the grid (only even numbers): ", "");
		if(size%2==0)
			break;
	}
	var game = new Game(size);
	game.play;
};

main();






























