const display = document.querySelector(".display")
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const ceButton = document.querySelector("#ce")
const delButton = document.querySelector("#del")
const decimalButton = document.querySelector(".decimal")

let eraseDisplay = true
let buffer = []

let operations = {
    '+': function(a,b) { return a + b },
    '-': function(a,b) { return a - b },
    '*': function(a,b) { return a * b },
    '/': function(a,b) { return a / b },
}

/*Handlers and functions*/ 
const numpadClickHandler = function (e) {
    if ( display.textContent === "0" || eraseDisplay) {
        display.textContent = e.target.id
        eraseDisplay = false
    }
    else if ( display.textContent.replace(".","").length > 7 ) {
        return
    }
    else {
        display.textContent += e.target.id
    }
}

const operatorsClickHandler = function (e) {
    buffer.push(display.textContent)
    eraseDisplay = true

    console.log("operatorsClickHandler called with buffer: " + buffer)

    switch(e.target.id){
        case "+":
        case "-":
        case "*":
        case "/":            
            buffer.push(e.target.id)
            break
        case "=":
            let result = (1 * operate(buffer).toFixed(7)).toString()
            if( result.replace(".","").length > 7 ) {
                display.textContent = "OL"
            }
            else {
                display.textContent = result
            }
            buffer = []
    }

    console.log("operatorsClickHander exited with buffer: " + buffer)
}

const operate = function(buffer) {
    
    let lhs = Number(buffer[0])    

    if( buffer.length > 1 ) {
        let operand = buffer[1]
        let rhs = buffer.slice(2)
        return operations[operand](lhs, operate(rhs))
    }
    else {
        return lhs
    }

}


/*Event listeners*/
numberButtons.forEach(number => {
    number.addEventListener('click', numpadClickHandler)
})

decimalButton.addEventListener('click', function() {
    if(!display.textContent.includes(".")) {
        display.textContent += "."        
    }
})

ceButton.addEventListener('click', function() {
    display.textContent = "0"
})

delButton.addEventListener('click', function() {
    if(display.textContent !== "0" && display.textContent !== "OL") {
        display.textContent = display.textContent.slice(0, -1)
    }
    if (display.textContent.length === 0 || display.textContent === "OL") {
        display.textContent = "0"
    }
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', operatorsClickHandler)
})



