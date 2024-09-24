import { GameController } from "./GameController";

const player1Grid = document.getElementById('player1-grid');
const player2Grid = document.getElementById('player2-grid');
const ships = document.querySelectorAll('.ship')

createGrid();
const gamecontroller = new GameController()

ships.forEach(ship => {
    ship.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('length', ship.dataset.length)
        e.dataTransfer.setData('direction', ship.dataset.direction)

    })
    ship.addEventListener('click', () => {
        toggleDirection(ship)
    })
})

player1Grid.addEventListener('dragover', (e) => {
    e.preventDefault()
})

player1Grid.addEventListener('drop', (e) => {
    e.preventDefault()
    const x = parseInt(e.target.getAttribute('data-x'))
    const y = parseInt(e.target.getAttribute('data-y'))

    const length = e.dataTransfer.getData('length')
    const direction = e.dataTransfer.getData('direction')

    gamecontroller.startGame({ x, y }, length, direction)
    playerShipUi({ x, y }, length, direction)
})



player2Grid.addEventListener('click', (e) => {
    const x = parseInt(e.target.getAttribute('data-x'))
    const y = parseInt(e.target.getAttribute('data-y'))

    gamecontroller.playRound({ x, y })
})

function toggleDirection(ship) {
    if (ship.dataset.direction == 'horizontal') {
        ship.dataset.direction = 'vertical'
    } else {
        ship.dataset.direction = 'horizontal'
    }
}
function createGrid() {
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
    let { x, y } = cords
    for (let i = 0; i < length; i++) {
        let gridCell
        if (direction === 'horizontal') {
            gridCell = document.querySelector(`.cell[data-x="${x + i}"][data-y="${y}"]`)

        } else {
            gridCell = document.querySelector(`.cell[data-x="${x}"][data-y="${y + i}"]`)

        }

        if (gridCell) {

            gridCell.classList.add('ship');
        }
    }
}


export { createGrid, playerShipUi };
