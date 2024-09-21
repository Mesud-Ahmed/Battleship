import Ship from "./Ship";
import { Gameboard } from "./Gameboard";

const myShip = new Ship(3);


const myGameboard = new Gameboard()

myGameboard.placeShip(myShip,{x:0,y:0},'horizontal')



myGameboard.receiveAttack({x:0,y:0})
myGameboard.receiveAttack({x:1,y:0})
myGameboard.receiveAttack({x:2,y:0})

console.log(myGameboard.areAllShipsSunk())