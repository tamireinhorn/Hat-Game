const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const validMoves = ['d','u', 'l', 'r']

class Field {
  constructor(field){
    this.field = field;
    this._playerCol = 0;
    this._playerRow = 0;
  }
  print(){
    console.log(this.field.map(row => row.join('')).join('\n'));
  }
  move(movement){
    let currentCol = this._playerCol;
    let currentRow = this._playerRow;
    switch (movement) {
        case "l":
            currentCol--;
            break;
        case "r":
            currentCol++;
            break;
        case "d":
            currentRow++;
            break;
        case "u":
            currentRow--;
            break;
        default:
            return 'Wrong move!';
    }
    if (currentCol > this.field.length -1 | currentCol < 0 | currentRow < 0 | currentRow > this.field[0].length - 1){
        return "You left the map and lost!";
    }
    else{
        this._playerCol = currentCol;
        this._playerRow = currentRow;
        console.log(currentRow, currentCol);
        switch(this.field[currentRow][currentCol]){
          case hat:
            return "You found the hat!";
          case hole:
            return "You feel and lost!";

        }

        this.field[currentRow][currentCol] = pathCharacter;
        this.print();
    }

  }
  play(){
    console.log("You've lost your hat in a maze! Let's play!");
    console.log(`The avaliable commands are up, down, left and right like: ${validMoves}`);
    this.print();
    let move = prompt("Which way?");

  }
}



const f = [
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]
const myField = new Field(f);
myField.play();

