import { GameController } from "./GameController";

document.addEventListener('DOMContentLoaded', () => {
    
    const startBtn = document.querySelector("#start-game")
    
    const player1Grid = document.getElementById('player1-grid');
    const player2Grid = document.getElementById('player2-grid');

    createGrid();  

    const gamecontroller = new GameController()
    gamecontroller.startGame()

  
    player2Grid.addEventListener('click', (e) => {
        const x = parseInt(e.target.getAttribute('data-x'))
        const y = parseInt(e.target.getAttribute('data-y'))

        gamecontroller.playRound({ x, y })
    })
})


function createGrid() {
    const player1Grid = document.getElementById('player1-grid');
    const player2Grid = document.getElementById('player2-grid');
    for (let i = 0; i < 100; i++) {
        const x = i % 10
        const y = Math.floor(i / 10)

        const gridCell1 = document.createElement('div')
        gridCell1.classList.add('cell')
        gridCell1.setAttribute('data-x', x)
        gridCell1.setAttribute('data-y', y)

        const gridCell2 = document.createElement('div')
        gridCell2.classList.add('cell')
        gridCell2.setAttribute('data-x', x)
        gridCell2.setAttribute('data-y', y)

        player1Grid.appendChild(gridCell1);
        player2Grid.appendChild(gridCell2);
    }
}

function playerShipUi(cords, length, direction) {
    const player1Grid = document.getElementById('player1-grid');
    for (let i = 0; i < length; i++) {
        let curx = cords.x
        let cury = cords.y

        if (direction === 'horizontal') {
            curx += i
        } else if (direction === 'vertical') {
            cury += i
        }

        const gridCell = document.querySelector(`.cell[data-x="${curx}"][data-y="${cury}"]`)
        if (gridCell) {
            console.log(`Placing ship part at (${curx}, ${cury})`); // Debugging
            document.querySelector('.cell[data-x="0"][data-y="0"]')

            gridCell.classList.add('ship');
        }
    }
}


export { createGrid, playerShipUi };
