const board = document.querySelector('.settings')
const input = document.querySelector('.settings_input')
const button = document.querySelector('.start')

function clearBoard(columns) {
    board.textContent = ''
    const template = document.querySelector('#gameTableTemplate')
    const table = template.querySelector('.table')
    const restart = template.querySelector('.table_button')
    // alert(columns)
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
    clearBoard(columns)
})
