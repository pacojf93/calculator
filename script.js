
const display = document.querySelector(".display")
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const ceButton = document.querySelector("#ce")

let eraseDisplay = true
let buffer = []

const numpadClickHandler = function (e) {
    if ( display.textContent === "0" | eraseDisplay) {
        display.textContent = e.target.id
        eraseDisplay = false
    }
    else {
        display.textContent += e.target.id
    }
}

const operatorsClickHandler = function (e) {

    buffer.push(display.textContent)
    eraseDisplay = true

    switch(e.target.id){
        case "+":
        case "-":
        case "*":
        case "/":            
            buffer.push(e.target.id)
            break
        case "=":
            while(buffer.length > 1) {
                let result = operate(buffer.shift(),buffer.shift(),buffer.shift())
                buffer.unshift(result)
            }

            display.textContent = buffer[0]
            buffer = []
    }

    console.log(buffer)
}

const operate = function(a, operator, b) {
    switch(operator) {
        case "+":
            return Number(a) + Number(b)
        case "-":
            return Number(a) - Number(b)
        case "*":
            return Number(a) * Number(b)
        case "/":
            return Number(a) / Number(b)        
    }
}

numberButtons.forEach(number => {
    number.addEventListener('click', numpadClickHandler)
})

ceButton.addEventListener('click', function() {
    display.textContent = "0"
    buffer = 0
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', operatorsClickHandler)
})

