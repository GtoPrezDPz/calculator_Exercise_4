

const display1El = document.querySelector(".display-1")  as HTMLElement
const display2El = document.querySelector(".display-2") as HTMLElement
const tempResultEl = document.querySelector(".temp-result") as HTMLElement
const numbersEl = document.querySelectorAll(".number") 
const operationEl = document.querySelectorAll('.operation') 
const equalEl = document.querySelector(".equal")as HTMLElement
const clearAllEl = document.querySelector('.all-clear') as HTMLElement


let dis1Num:string = ""; 
let dis2Num: string = ""; 
let result:number 
let lastOperation :string
let isDecimal: boolean = false; 

numbersEl.forEach((number) => {
    number.addEventListener("click", (e:Event) => {
        const target = e.target as HTMLButtonElement;
        if (target.innerText === "." && !isDecimal) {
            isDecimal = true;
        }
        else if (target.innerText === "." && isDecimal) { 
            return;
        }
        dis2Num += target.innerText;
        if (display2El){
            display2El.innerText = dis2Num;
        }
    });
});

operationEl.forEach((operation) => {
    operation.addEventListener("click", (e:Event) => {
        const target = e.target as HTMLButtonElement;
        if (!dis2Num) return;
        isDecimal = false;
        const operationName = target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
           
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);     
        lastOperation = operationName;

    })
});

function clearVar(operation = "") {
    dis1Num += dis2Num + " " + operation + " ";
    
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
}

function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result.toString()) * parseFloat(dis2Num);
    }
    else if (lastOperation === "+") {
        result = parseFloat(result.toString()) + parseFloat(dis2Num);
    }
    else if (lastOperation === "-") {
        result = parseFloat(result.toString()) - parseFloat(dis2Num);
    }
    else if (lastOperation === "/") {
        result = parseFloat(result.toString()) / parseFloat(dis2Num);
    }
    else if (lastOperation === "Exp") {
        result = parseFloat(result.toString()) * Math.pow(10,parseFloat(dis2Num))
    }
}

equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    isDecimal = false;
    mathOperation();
    clearVar();
    display2El.innerText = result.toString();
    dis2Num = result.toString();
    dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = 0
    tempResultEl.innerText = "";
});