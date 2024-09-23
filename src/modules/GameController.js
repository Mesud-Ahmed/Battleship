import { playerShipUi } from "./dom";
import { player } from "./player";
import Ship from "./Ship";

export class GameController {
    constructor() {
        this.player1 = new player('Player1')
        this.computer = new player('computer', true)
        this.currentPlayer = this.player1
        this.isGameOver = false
    }
    startGame() {
        const player1Ship = new Ship(3)
        const cptrShip = new Ship(3)

        this.player1.gameboard.placeShip(player1Ship, { x: 0, y: 0 }, 'horizontal')
        playerShipUi({ x: 0, y: 0 },player1Ship.length,'horizontal')
        this.computer.gameboard.placeShip(cptrShip, { x: 5, y: 5 }, 'vertical')

    }
    playRound(coordinates) {
        if (this.isGameOver) return
        const result = this.currentPlayer.attack(this.computer, coordinates)
        this.attackUI(coordinates, result)

        if (this.computer.gameboard.areAllShipsSunk()) {
            this.isGameOver = true
            alert(`${this.currentPlayer.name} wins!`)
            return;
        }

        this.currentPlayer = this.computer
        this.computerAttack()
        if(this.player1.gameboard.areAllShipsSunk()){
            this.isGameOver = true
            alert('computer wins!')
            return
        }

        this.currentPlayer = this.player1

    }

    computerAttack() {
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)

        const result = this.computer.attack(this.player1, { x, y })
        this.attackUI({ x, y }, result)
    }
    attackUI(coordinates, result) {
        const { x, y } = coordinates

        const grid = this.currentPlayer === this.player1 ? '#player2-grid' : '#player1-grid'
        const gridCell = document.querySelector(`${grid}.cell[data-x="${x}"][data-y="${y}"]`)

        if (result == 'hit') {
            gridCell.classList.add('hit')

        } else {
            gridCell.classList.add('mis')

        }
    }
}