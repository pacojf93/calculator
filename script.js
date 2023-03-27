
const display = document.querySelector(".display")
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const ceButton = document.querySelector("#ce")
const delButton = document.querySelector("#del")
const decimalButton = document.querySelector(".decimal")

let eraseDisplay = true
let isDecimal = false
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

            display.textContent = Math.round(Number(buffer[0]))
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

const decimalClickHandler = function (e) {
    if(!display.textContent.includes(".")) {
        display.textContent += "."        
    }

    console.log(!display.textContent.search("."))
}

numberButtons.forEach(number => {
    number.addEventListener('click', numpadClickHandler)
})

ceButton.addEventListener('click', function() {
    display.textContent = "0"
    buffer = 0
})

delButton.addEventListener('click', function() {
    if(display.textContent !== "0") {
        display.textContent = display.textContent.slice(0, -1)
    }
    if (display.textContent.length === 0) {
        display.textContent = "0"
    }
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', operatorsClickHandler)
})

decimalButton.addEventListener('click', decimalClickHandler)

