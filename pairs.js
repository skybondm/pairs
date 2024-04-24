const board = document.querySelector('.settings')
const input = document.querySelector('.settings_input')
const button = document.querySelector('.start')

let intervalId
let flips = 0
let time = 60

const couple = {
    first: null,
    firstClickable: true,
    second: null,
    secondClickable: true
}
function clearBoard(count, columns) {
    board.textContent = ''  //очистка поля
    const template = document.querySelector('#gameTableTemplate').cloneNode(true).content
    const table = template.querySelector('.table')
    const restart = template.querySelector('.table_button')
    const icons = createIconsArray(count) //
    icons.forEach (function (icon){
        table.append(creatCard(icon)) //
    })
        
    table.style = `
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${columns}, 1fr);
    `;

    board.append(table)
    startTimer()
    restart.addEventListener('click', function(){
        location.reload()
    })
    board.append(restart)
}

button.addEventListener('click', function(event){  //начало игры
    event.preventDefault()
    let columns = input.value
    let count
    if (columns == 2 || columns == 4 || columns == 6){
        count = columns*columns
    }
    else {
        alert('Введите правильное значение (2, 4 или 6)')
        return
    }

    clearBoard(count, columns)
})
function creatCard(flippedIcon){
    const template = document.querySelector('#card').cloneNode(true).content
    const card = template.querySelector('.cards')
    card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`)
    card.addEventListener('click', function(){
        game_logic(card)
    })
    return card
}
function createIconsArray(initialCount){
    const cardsIcons = ["compass", "cloud", "play", "bolt", "stop", "cogs", "car", "heart-o", "arrows", "motorcycle", "bars", "file", "filter", "gear", "folder", "folder-open", "shield", "scissors", "pen-clip"]
    let cards = cardsIcons.slice(0,Math.floor(initialCount/2))
    const doubleCards = duplicateElements(cards)
    return shuffleArray(doubleCards)
}
function duplicateElements(array) {
    const newArray = []
    array.forEach(function(card){
        newArray.push(card, card)
    })
    return newArray
}
function shuffleArray(array) {
    let index = array.length
    while (index!==0) {
        const randomIndex = Math.floor(Math.random()*index)
        index--

        const temporary = array[index]
        array[index] = array[randomIndex]
        array[randomIndex] = temporary
    }
    return array
}

function startTimer () {
    const Time = document.querySelector('.time')
    const Flips = document.querySelector('.flips')
    intervalId = setInterval(function(){
        time = time - 1
        Time.textContent = `Время: ${time} сек`
        if (time === 0) {
            clearInterval(intervalId)
        }
        Flips.textContent = `Шаги: ${flips}`
    },1000)
    if (input.value == 2){
        time = 10
        Time.textContent = `Время: ${time} сек`
    }
    if (input.value == 6){
        time = 90
        Time.textContent = `Время: ${time} сек`
    }
    if (input.value == 4){
        time = 60
        Time.textContent = `Время: ${time} сек`
    }
}

function game_logic (card) {
    if (!couple.firstClickable && !couple.secondClickable) return
    
    if (time===0){
        return
    }
    card.classList.add('flip')
    flips++

    if (couple.first === null){
        couple.first = card
        couple.firstClickable = false
    }
    else if (couple.second === null && couple.first !== card){
        couple.second = card
        couple.secondClickable = false
    }

    if (couple.first === null || couple.second === null) return

    const is_equal = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2]
    if (is_equal){
        setTimeout(function(){
            couple.first.classList.add('success')
            couple.second.classList.add('success')
            refresh()
        }, 500)
    }
    else {
        setTimeout(function(){
            couple.first.classList.remove('flip')
            couple.second.classList.remove('flip')
            refresh()
        }, 500)
    }
}

function refresh () {
    couple.first = null
    couple.firstClickable = true
    couple.second = null
    couple.secondClickable = true
    win ()
}


function generate_confetti(amount) {
    const colors = ['d13447', 'ffbf00', '263672']
    const confettiArray = []
    for (let d=0; d< amount; d++) {
        const confetti = document.createElement('div')
        confetti.style = `
        position: absolute;
        width: ${Math.random()*20}px;
        height: ${Math.random()*10}px;
        background-color: #${colors[Math.floor(Math.random()*colors.length)]};
        top: -10%;
        left: ${Math.random()*100}%;
        transform: rotate(${Math.random()*360}deg);
        animation: move ease-in-out ${(Math.random()+0.2)*10}s infinite;
        `
        confettiArray.push(confetti)
    }
    return confettiArray
}

const confetti = generate_confetti(150)

function start_confetti(){
    const conf = document.querySelector('.confetti')
    confetti.forEach(function (item){
        conf.append(item)
    })
}

function win () {
    const table = document.querySelector('.table')
    if (Array.from(table.children).every((card)=>card.classList.contains('flip'))) {
        setTimeout(function(){
            start_confetti()
            clearInterval(intervalId)
        }, 1000)
    }
}