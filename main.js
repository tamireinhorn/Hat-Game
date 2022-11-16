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
    let movement = prompt("Which way? ");
    let temp = this.move(movement);
    while (!temp){
        movement = prompt("Which way? ");
        temp = this.move(movement);
    }
    console.log(temp);   
  }
  static generateField(rows, columns, percentage = 2/9){
    let hatRow = 0;
    let hatColumn = 0;
    let field=  Array.from({length: rows}, e => Array(columns).fill(fieldCharacter));
    if (percentage >= 1 ){
        console.log('Invalid value for percentage of holes. Using default');
        percentage = 2/9;
    }
    
    
    
    let numberOfHoles = Math.floor(percentage * rows * columns);
    while (numberOfHoles > 0){
        let holeRow = Math.floor(Math.random() * rows);
        let holeColumn = Math.floor(Math.random() * columns);
        field[holeRow][holeColumn] = hole;
        numberOfHoles--;
    }
    while ((hatRow === 0 & hatColumn === 0)){
        hatRow = Math.floor(Math.random() * rows);
        hatColumn = Math.floor(Math.random() * columns);
    }
    field[hatRow][hatColumn] = hat;
    field[0][0] = pathCharacter;
    return field;
  }
}

const newField = Field.generateField(5, 5, 0.2);
console.log(newField);
const f = new Field(newField);
f.play();

