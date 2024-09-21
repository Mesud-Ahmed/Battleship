export class Gameboard {
    constructor() {
        this.gridSize = 10;                          // Size of the board (10x10)
        this.ships = [];                             // List to store placed ships
        this.missedAttacks = [];                     // Array to store missed shots
    }

    placeShip(ship, startCoordinates, direction) {
        const { x, y } = startCoordinates;
        let shipCoordinates = [];

        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                shipCoordinates.push({ x: x + i, y });
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                shipCoordinates.push({ x, y: y + i });
            }
        }

        this.ships.push({ ship, coordinates: shipCoordinates });
    }

    // Method to handle attacks
    receiveAttack(coordinates) {
        const { x, y } = coordinates;
      
        // Check if the attack hits any ship's coordinates
        let hitShip = this.ships.find(shipObj =>
          shipObj.coordinates.some(coord => coord.x === x && coord.y === y)
        );
      
        if (hitShip) {
          hitShip.ship.hit(); // Call hit method on the ship
          return "hit"; // Return hit status
        } else {
          this.missedAttacks.push({ x, y }); // Record the miss
          return "miss"; // Return miss status
        }
      }
      

    // Method to check if all ships have been sunk
    areAllShipsSunk() {
        return this.ships.every(shipObj => shipObj.ship.isSunk());
    }
}

