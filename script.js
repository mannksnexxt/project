let desk = document.querySelector('.chess-desk');

makeDesk(desk);
reverse(desk);
fillDesk(desk);


function makeDesk(el) {
    let letters = ' abcdefgh ';
    let rows = ' 87654321 ';

    for (let i of rows) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j of letters) {
            let col = document.createElement('div');
            col.classList.add('col');

            if (i == ' ') {
                col.innerText = j;
            } else {
                if (j == ' ') {
                    col.innerText = i;
                } else {
                    let colIndex = letters.indexOf(j);
                    let rowIndex = rows.indexOf(i);

                    if (rowIndex % 2 != 0) {
                        if (colIndex % 2 != 0) {
                            col.classList.add('white');
                        } else {
                            col.classList.add('black');
                        }
                    }
                    if (rowIndex % 2 == 0) {
                        if (colIndex % 2 == 0) {
                            col.classList.add('white');
                        } else {
                            col.classList.add('black');
                        }
                    }
                }
            }
            row.append(col);
        }
        el.append(row);
    }
}

function reverse(el) {
    let cols = el.querySelector('.row').children;
    let rows = el.querySelectorAll('.row');

    for (let row of rows) {
        row.lastChild.style.transform = 'rotate(180deg)';
    }
    for (let col of cols) {
        col.style.transform = 'rotate(180deg)';
    }
}

function fillDesk(el) {
    let positions = { // конфигурация расположения фигур
        avangard: ' ffffffff ',
        main: ' abcdecba '
    };
    // выборка строк
    let blackMainCols = el.querySelectorAll('.row')[1].querySelectorAll('.col');
    let blackAvangardCols = el.querySelectorAll('.row')[2].querySelectorAll('.col');
    let whiteMainCols = el.querySelectorAll('.row')[8].querySelectorAll('.col');
    let whiteAvangardCols = el.querySelectorAll('.row')[7].querySelectorAll('.col');
    // распределение фигур
    for (let i = 1; i < 9; i++) {
        fillRow(blackFigures, blackMainCols, i, positions.main); // черные основные
        fillRow(blackFigures, blackAvangardCols, i, positions.avangard); // черные пешки
        fillRow(whiteFigures, whiteMainCols, i, positions.main); // белые основные
        fillRow(whiteFigures, whiteAvangardCols, i, positions.avangard); //белые пешки
    }
}

function fillRow(figures, array, i, positions) {
    let figure = figures.filter(
        item => item.figure == positions[i]
    )[0];
    array[i].innerHTML = figure.code;
}
