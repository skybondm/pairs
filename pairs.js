const board = document.querySelector('.board')
const input = document.querySelector('.settings_input')
const button = document.querySelector('.start')

function clearBoard(count, columns) {
    board.textContent = ''
    const template = document.querySelector('#gameTableTemplate').cloneNode(true).content
    const table = template.querySelector('.table')
    const restart = template.querySelector('.table_button')
    const icons = createIconsArray(count)
    icons.forEach (function (icon){
        table.append(creatCard(icon))
    })
        
    table.style = `
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${columns}, 1fr);
    `;

    board.append(table)
    restart.addEventListener('click', function(){
        location.reload()
    })
    board.append(restart)
}
button.addEventListener('click', function(event){
    event.preventDefault()
    let columns = input.value
    
    let count = columns*columns
    clearBoard(count, columns)
})
function creatCard(flippedIcon){
    const template = document.querySelector('#card').cloneNode(true).content
    const card = template.querySelector('.cards')
    card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`)
    return card
}
function createIconsArray(initialCount){
    const cardsIcons = ["compass", "cloud", "play", "bolt"]
    return cardsIcons
}