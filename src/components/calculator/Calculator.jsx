import { useState } from "react"
import { add, subtract, multiply, divide } from "./Operators"
import styles from "./Calculator.module.css"

export function Calculator() {

    const [powerOn, setPowerOn] = useState(false)
    const [calcArray, setCalcArray] = useState([
        // {type: "num", value: "8"},
        // {type: "operator", value: "+", func: (num1, num2) => add(num1, num2)}
    ])
    const [currentNum, setCurrentNum] = useState("")
    const [displayNum, setDisplayNum] = useState("0")

    const handleNumInput = (input) => {
        if (currentNum.length >= 10) return

        if (currentNum === "0") {
            setCurrentNum(input)
            setDisplayNum(input)
        } else if (currentNum === "-0") {
            setCurrentNum("-" + input)
            setDisplayNum("-" + input)
        } else {
            setCurrentNum(currentNum + input)
            setDisplayNum(currentNum + input)
        }
    }

    const handleDecimalInput = () => {
        if (displayNum.length >= 10) return
        if (currentNum.indexOf('.') > -1) return
        
        if (!currentNum) {
            setCurrentNum("0.")
            setDisplayNum("0.")
        } else {
            setCurrentNum(currentNum + ".")
            setDisplayNum(currentNum + ".")
        }
    }

    const handleOperator = (value, func) => {
        // if (currentNum.length >= 10) return
        // if there is no current number entered, just change the operator in the calcArray
        if (!currentNum && calcArray.length > 0) {
            calcArray[1] = {
                type: "operator",
                value: value,
                func: func
            }
        } else {
            let numTotal

            if (calcArray.length > 0) {
                numTotal = calcArray[1].func(parseFloat(calcArray[0].value), parseFloat(currentNum))
            } else {
                numTotal = currentNum ? currentNum : "0"
            }

            setCalcArray([
                {
                    type: "num",
                    value: numTotal
                },
                {
                    type: "operator",
                    value: value,
                    func: func
                }]
            )
        }

        setCurrentNum("")
    }

    const handleEquals = () => {
        // if (currentNum.length >= 10) return
        if (calcArray.length === 0) return

        const copy = [...calcArray]
        let total

        if (copy[copy.length - 1].value === "=") {
            copy[0].value = displayNum
        }

        if (currentNum) {
            total = calcArray[1].func(parseFloat(calcArray[0].value), parseFloat(currentNum))
        } else {
            total = calcArray[1].func(parseFloat(calcArray[0].value), parseFloat(calcArray[0].value))
        }

        if (copy[copy.length - 1].value !== "=") {
            copy.push({type: "num", value: currentNum ? currentNum : calcArray[0].value})
            copy.push({value: "="})
        }

        setCalcArray(copy)
        setDisplayNum(total.toString())
    }

    const handlePlusMinus = () => {
        let n = currentNum

        if (!n) {
            n ="-0"
        } else {
            if (n[0] === "-") {
                n = n.replace("-", "")
            } else {
                n = "-" + n
            }
        }

        setCurrentNum(n)
        setDisplayNum(n)
    }

    const handleBackspace = () => {
        if (!currentNum) return

        let n = currentNum

        n = n.slice(0,-1)

        setCurrentNum(n)
        if (!n) {
            setDisplayNum("0")
        } else {
            if (n === "-") {
                setCurrentNum("-0")
                setDisplayNum("-0")
            } else {
                setCurrentNum(n)
                setDisplayNum(n)
            }
        }
    }


    return (
        <div className={styles.main}>
            <div className={styles.calculator}>

                {/* Screen */}
                <div className={styles.screenContainer}>
                    <div className={styles.screenHeader}>
                        {
                            calcArray.map((item) => {return item.value + " "})
                        }
                    </div>
                    <div className={styles.screenBody}>
                        {
                            !powerOn
                                ? ""
                                : displayNum
                        }
                    </div>
                </div>

                {/* Buttons */}
                <div className={styles.buttonsContainer}>
                    <button
                        disabled={!powerOn}
                        onClick={() => {
                            setCalcArray([])
                            setCurrentNum("")
                            setDisplayNum("0")
                        }}
                        className={styles.button}
                    >
                        CE
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handlePlusMinus()}
                        className={styles.button}
                    >
                        +/-
                    </button>
                    <button
                        onClick={handleBackspace}
                        disabled={!powerOn}
                        className={styles.button}
                    >
                        {"<-"}
                    </button>
                    <button
                        onClick={() => setPowerOn(!powerOn)}
                        className={`${styles.button} bg-orange-200`}
                    >
                        I/O
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("7")}
                        className={styles.button}
                    >
                        7
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("8")}
                        className={styles.button}
                    >
                        8
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("9")}
                        className={styles.button}
                    >
                        9
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleOperator("÷", (num1, num2) => divide(num1, num2))}
                        className={styles.button}
                    >
                        ÷
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("4")}
                        className={styles.button}
                    >
                        4
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("5")}
                        className={styles.button}
                    >
                        5
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("6")}
                        className={styles.button}
                    >
                        6
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleOperator("x", (num1, num2) => multiply(num1, num2))}
                        className={styles.button}
                    >
                        x
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("1")}
                        className={styles.button}
                    >
                        1
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("2")}
                        className={styles.button}
                    >
                        2
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("3")}
                        className={styles.button}
                    >
                        3
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleOperator("-", (num1, num2) => subtract(num1, num2))}
                        className={styles.button}
                    >
                        -
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleNumInput("0")}
                        className={styles.button}
                    >
                        0
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={handleDecimalInput}
                        className={styles.button}
                    >
                        .
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={handleEquals}
                        className={styles.button}
                    >
                        =
                    </button>
                    <button
                        disabled={!powerOn}
                        onClick={() => handleOperator("+", (num1, num2) => add(num1, num2))}
                        className={styles.button}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}