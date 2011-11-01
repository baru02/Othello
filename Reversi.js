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
	};
}
//---------------------------------------------------------
// Field's functions
var Field = function(color){
	this.color;

	setColor: function(color){
		this.color = color;
	},

	getColor: function(){
		return this.color;		
	};
}

var colorsEnum = {black:1, white:2};
Object.freeze(colorsEnum);

//---------------------------------------------------------
// Player's functions

var Player = function(id, color){
	this.id = id;
	this.color = color;
	this.score = 0;
	
	makeMove: function(grid){
		var move = "";//prompt("What's your next move, busy lady?(type in the coordinates in format 'width height' ", "");
		var coords = convertInput(move);
		checkIfLegal(coords, grid);
		updateGrid(coords, grid);
	};
}

//---------------------------------------------------------
// Game's functions

function Game(size){
	this.players = [];
	this.grid = new Grid(size);
	
	initialise: function(size){
		grid.getFieldAt(grid.width/2, grid.height/2).setColor(colorsEnum.white);
		grid.getFieldAt(grid.width/2+1, grid.height/2+1).setColor(colorsEnum.white);
		grid.getFieldAt(grid.width/2+1, grid.height/2).setColor(colorsEnum.black);
		grid.getFieldAt(grid.width/2, grid.height/2+1).setColor(colorsEnum.black);
	},

	play: function(){
		var i = 0;
		while(!isGameFinished()){
			this.players[i].makeMove();
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

	toString: function() {
		var characters = [];
		var endOfLine = this.grid.width - 1;
		this.grid.each(function(x, y, value){
			characters.push(characterFromElement(value));
			if(x == endOfLine)
				characters.push("\n");
		});
		return characters.join("");
	};
}

//---------------------------------------------------------
// Other functions (maybe prototype methods)

function checkIfLegal(coords, grid){
	if(grid.getFieldAt(coords[0], coords[1]).getColor!=undefined)
		return false;
}

function updateGrid(coords, grid){
	
}

function isGameFinished(){
	
}

function convertInput(move){
	var coords = [];
	coords.push(move.charAt(0));
	coords.push(move.charAt(2));
	return coords;
}

function chracterFromElement(element){
	if(element.color == undefined)
		return '_';
	else if (element.color == black)
		return 'x';
	else
		return 'o';
}

///////////////////////////////////////////////////////////
// main //

function main(){
	while(1){
		var size=8;// = prompt("Could you enter the size of the grid (only even numbers): ", "");
		if(size%2==0)
			break;
	}
	var game = new Game(size);
	game.play;
}

main();






























