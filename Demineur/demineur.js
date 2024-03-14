'use strict';

function setMatrice() {
    let myGrid = [];
    for (let j = 0; j < 10; j++) {
        myGrid.push([]);
        for (let i = 0; i < 10; i++) {
            myGrid[j].push(0);
        }
    }
    return myGrid;
}

function positionOfBomb() {
    let myBombs = [];
    for (let i = 0; i < 10; i++) {
        let nouvelleBomb = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        myBombs.push(nouvelleBomb)
    }
    return myBombs;
}

function formatGrid(myGrid) {
    for (let i = 0; i < myGrid.length; i++) {
        for (let j = 0; j < myGrid.length; j++) {
            if (myGrid[i][j] == 'X') {
                if (i < 9 && myGrid[i + 1][j] != 'X') {
                    myGrid[i + 1][j]++;
                }
                if (i < 9 && j < 9 && myGrid[i + 1][j + 1] != 'X') {
                    myGrid[i + 1][j + 1]++;
                }
                if (j < 9 && myGrid[i][j + 1] != 'X') {
                    myGrid[i][j + 1]++;
                }
                if (i > 0 && j < 9 && myGrid[i - 1][j + 1] != 'X') {
                    myGrid[i - 1][j + 1]++;
                }
                if (i > 0 && myGrid[i - 1][j] != 'X') {
                    myGrid[i - 1][j]++;
                }
                if (i > 0 && j > 0 && myGrid[i - 1][j - 1] != 'X') {
                    myGrid[i - 1][j - 1]++;
                }
                if (j > 0 && myGrid[i][j - 1] != 'X') {
                    myGrid[i][j - 1]++;
                }
                if (i < 9 && j > 0 && myGrid[i + 1][j - 1] != 'X') {
                    myGrid[i + 1][j - 1]++;
                }
            }
        }
    }
}

function portGrid(myGrid) {
    for (let i = 0; i < myGrid.length; i++) {
        document.getElementById("grid").appendChild(document.createElement("div")).setAttribute("id", "div" + i);
        document.getElementById("div" + i).setAttribute("class", "collumn");
        for (let j = 0; j < myGrid.length; j++) {
            document.getElementById("div" + i).appendChild(document.createElement("div")).setAttribute("id", "div" + i + "." + j);
            document.getElementById("div" + i + "." + j).innerHTML = myGrid[i][j];
            document.getElementById("div" + i + "." + j).setAttribute("class", "hidden");
            document.getElementById("div" + i + "." + j).addEventListener("click", reveal);
            document.getElementById("div" + i + "." + j).addEventListener("contextmenu", dropDrapeau);
        }
    }
}

let count = 0;
let grey = 0;

function reveal() {
    revealTest(this.id);
}

function revealTest(test) {
    let clic = document.getElementById(test);
    if (clic.innerHTML == 'X') {
        alert("BOUM, vous avez perdu, faites F5 pour rejouer!");
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                document.getElementById("div" + i + "." + j).setAttribute("class", "reveal");
            }
        }
    }
    else if (clic.innerHTML == 0) {
        let pos = test;
        let posY = parseInt(pos.substring((pos.indexOf(".")) + 1));
        let posX = parseInt(pos.substring(pos.indexOf(".") - 1));
        clic.setAttribute("class", "reveal");
        count++;
        let down = "div" + (posX - 1) + "." + posY;
        if (posX > 0 && document.getElementById(down).className == "hidden") {
            revealTest(down);
        }
        let up = "div" + (posX + 1) + "." + posY;
        if (posX < 9 && document.getElementById(up).className == "hidden") {
            revealTest(up);
        }
        let left = "div" + posX + "." + (posY - 1);
        if (posY > 0 && document.getElementById(left).className == "hidden") {
            revealTest(left);
        }
        let right = "div" + posX + "." + (posY + 1);
        if (posY < 9 && document.getElementById(right).className == "hidden") {
            revealTest(right);
        }
    }
    else {
        clic.setAttribute("class", "reveal");
        count++;
    }
    if (count > 89 && grey + count == 100) {
        alert("Bravo, vous avez gagné!!!!!!");
    }
}

function dropDrapeau() {
    if (this.className == "hidden") {
        this.setAttribute("class", "dontreveal");
        grey++;
    } else if (this.className == "dontreveal") {
        this.setAttribute("class", "hidden");
        grey--;
    }
    if (count > 89 && grey + count == 100) {
        alert("Bravo, vous avez gagné!!!!!!");
    }
}

let grid = setMatrice();
let bombs = positionOfBomb();
for (let i = 0; i < bombs.length; i++) {
    grid[bombs[i][0]][bombs[i][1]] = 'X';
}
formatGrid(grid);
portGrid(grid);