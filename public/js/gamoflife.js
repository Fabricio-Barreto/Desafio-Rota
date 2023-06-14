class GameOfLife {
    constructor(width, height) {
        this.canvas = new Canvas();
        this.canvas.canvas.addEventListener('click', event => this.mouseClick(event))
        this.BoardSize = {
            Width: width,
            Height: height
        };
        this.CellSize = {
            Width: this.canvas.Width / width,
            Height: this.canvas.Height / height
        }
        this.Cells = [];
        this.startCells();
        this.startNears();
    }
    mouseClick(event) {
        let mx = event.layerX;
        let my = event.layerY;
        let x = Math.trunc( mx / this.CellSize.Width);
        let y = Math.trunc( my / this.CellSize.Height);
        let cell = this.Cells[y][x];
        console.log({
            mx,
            my,
            x,
            y,
        })
        cell.alive = +!cell.alive;
        this.renderCell(cell)
    }
    startCells(){
        for (let y = 0; y < this.BoardSize.Width; y++) {
            let line = [];
            this.Cells.push(line);
            for (let x = 0; x < this.BoardSize.Width; x++) {
                let cell = {
                    alive: getRandomInt(0, 2),
                    x: x * this.CellSize.Width,
                    y: y * this.CellSize.Height,
                    next: 0
                };
                line.push(cell);
            }
        }
    }

    startNears() {
        this.Cells.forEach((line, y) => {
            line.forEach((cell, x) => {
                cell.nears = [];
                for(let dy = -1; dy <= 1; dy++) {
                    for(let dx = -1; dx <= 1; dx++) {
                        let vx = x + dx;
                        let vy = y + dy;

                        if (dx !== 0 || dy !== 0) {
                                if (vx >= 0 && vx < this.BoardSize.Width && vy >= 0 && vy < this.BoardSize.Height) {
                                let vcell = this.Cells[vy][vx];
                                cell.nears.push(vcell);
                            }
                        }
                    }
                }
            });
        });
    }

    clearCells() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                cell.alive = 0;
            })
        })
    }


    calculate() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                let v = 0;
                cell.nears.forEach(vcell => {
                    v += vcell.alive;
                })
                if (cell.alive) cell.next = +(v >= 2 && v <= 3);
                else cell.next = +(v == 3);
            });
        });
    }

    update() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                cell.alive = cell.next;
            });
        });
    }

    render() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                this.renderCell(cell);
            });
        });
    }

    renderCell(cell) {
        this.canvas.rectangle(cell.x, cell.y, this.CellSize.Width, this.CellSize.Height, 'black', 'white');
        if (cell.alive) this.canvas.rectangle(cell.x, cell.y, this.CellSize.Width, this.CellSize.Height, 'black', 'green')
    }

    
    execute () {
        if (temporizador < 0) {
            temporizador = 5;
            this.calculate();
            this.update();
            this.render();
        }
        

        temporizador--;
        
    }

    
}

var game = new GameOfLife(30, 30);
var idAnimation;
var temporizador = 5;

function executeGame() {
    game.execute();
    idAnimation = requestAnimationFrame(executeGame);
}

let btStart = document.getElementById("start");
btStart.onclick = function () {
    if (!idAnimation) idAnimation = requestAnimationFrame(executeGame);
};

let btStop = document.getElementById("stop");
btStop.onclick = function () {
    if (idAnimation) cancelAnimationFrame(idAnimation);
    idAnimation = 0;
};

let btClear = document.getElementById("clear");
btClear.onclick = function () {
    if (idAnimation) cancelAnimationFrame(idAnimation);
    idAnimation = 0;
    game.clearCells();
    game.render();
};

game.render();