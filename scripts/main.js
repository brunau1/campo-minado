const fieldWidth = 60 
const fieldHeight = 60

const gameContent = {
    fieldWidth,
    fieldHeight,
    fieldStructure: createGameContentStructure(fieldWidth, fieldHeight)
}

function createGameContentStructure(width, height){
    const fieldStructure = []
    const bombsDensity = 0.5

    for (let block = 0; block < width * height; block ++){
        if (block) {
            const blockValue = Math.floor(Math.random() * (1/bombsDensity) + 1) == 1 ? true : false
            fieldStructure.push(blockValue)
        }
    }
    return fieldStructure
}

function createHtmlTableStructure( gameContent ){
    let tableHtml = '<table id="game-table">'
    for(let row = 0; row < gameContent.fieldHeight; row++){
        tableHtml += '<tr>'
        for(let column = 0; column < gameContent.fieldHeight; column++){
            const position = (row * gameContent.fieldHeight) + column 
            const blockClass = gameContent.fieldStructure[position] == true ? 'bomb' : 'empty' 
            tableHtml += `<td id="${position}" class="${blockClass}"></td>`
        }
        tableHtml += '</tr>'
    }
    tableHtml += '</table>'
    return tableHtml
}

function renderStructure( gameContent ){
    const htmlTable = createHtmlTableStructure( gameContent )
    const gameCanvas = document.getElementById('game-canvas')
    gameCanvas.innerHTML = htmlTable
}



var loop = () => setTimeout(()=>{
    gameContent.fieldStructure = createGameContentStructure(fieldWidth, fieldHeight)
    renderStructure( gameContent )
    loop()
}, 1000)

loop()
