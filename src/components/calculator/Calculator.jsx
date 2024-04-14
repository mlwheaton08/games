import { useState } from "react"
import { add, subtract, multiply, divide } from "./Operators"
import styles from "./Calculator.module.css"

export function Calculator() {

    const [committedNum, setCommittedNum] = useState("")
    const [committedOperator, setCommittedOperator] = useState({symbol: ""})

    const [currentNum, setCurrentNum] = useState("0")
    const [currentOperator, setCurrentOperator] = useState({symbol: ""})

    const [displayNum, setDisplayNum] = useState("0")
    const [displayOperator, setDisplayOperator] = useState("")
    const [displayEquals, setDisplayEquals] = useState("")



    const handleEquals = () => {
        if (!committedNum) return

        const n = committedOperator.func(parseFloat(committedNum), parseFloat(currentNum))
        setDisplayEquals(`${currentNum} =`)
        setDisplayNum(n)
    }
    
    const handleOperator = (operatorObj) => {

        if (displayEquals) setDisplayEquals("")

        setCurrentOperator(operatorObj)
        setDisplayOperator(operatorObj.symbol)

        // if there's already a currentOperator, end the function
        if (currentOperator.symbol) return
        
        else {
            // if last character of currentNum is a decimal, chop it off
            let n = currentNum
            if (n[n.length - 1] === ".") n = n.replace(".", "")

            const cn = committedNum ? committedOperator.func(parseFloat(committedNum), parseFloat(n)) : n
            setCommittedNum(cn)
            setCurrentNum("0")
            setDisplayNum(cn)
        }
    }

    const handleNumInput = (num) => {
        if (currentNum.length >= 10) return

        let n = currentNum

        switch(n) {
            case "0":
                n = num
                break;
            case "-0":
                n = "-" + num
                break;
            default:
                n = n + num
        }

        setCurrentNum(n)
        setDisplayNum(n)

        // if there's a current operator
        if (currentOperator.symbol) {
            setCommittedOperator(currentOperator)
            setCurrentOperator({symbol: ""})
        }
    }
    
        const handleDecimalInput = () => {
            if (currentNum.length >= 10) return
            if (currentNum.indexOf('.') > -1) return
    
            setCurrentNum(currentNum + ".")
            setDisplayNum(currentNum + ".")
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

    const handleClear = () => {
        setCommittedNum("")
        setCommittedOperator({symbol: ""})
        setCurrentNum("0")
        setCurrentOperator({symbol: ""})
        setDisplayNum("0")
        setDisplayOperator("")
        setDisplayEquals("")
    }
    

    return (
        <div className={styles.main}>
            <div className={styles.calculator}>

                {/* Screen */}
                <div className={styles.screenContainer}>
                    <div className={styles.screenHeader}>
                        {`${committedNum} ${displayOperator} ${displayEquals}`}
                    </div>
                    <div className={styles.screenBody}>
                        {displayNum}
                    </div>
                </div>

                {/* Buttons */}
                <div className={styles.buttonsContainer}>
                    <button
                        onClick={handleClear}
                        className={`${styles.button} ${styles.spanTwo}`}
                    >
                        C
                    </button>
                    <button
                        onClick={handlePlusMinus}
                        className={styles.button}
                    >
                        +/-
                    </button>
                    <button
                        onClick={() => handleOperator({symbol: "÷", func: (num1, num2) => divide(num1, num2)})}
                        className={styles.button}
                    >
                        ÷
                    </button>
                    <button
                        onClick={() => handleNumInput("7")}
                        className={styles.button}
                    >
                        7
                    </button>
                    <button
                        onClick={() => handleNumInput("8")}
                        className={styles.button}
                    >
                        8
                    </button>
                    <button
                        onClick={() => handleNumInput("9")}
                        className={styles.button}
                    >
                        9
                    </button>
                    <button
                        onClick={() => handleOperator({symbol: "x", func: (num1, num2) => multiply(num1, num2)})}
                        className={styles.button}
                    >
                        x
                    </button>
                    <button
                        onClick={() => handleNumInput("4")}
                        className={styles.button}
                    >
                        4
                    </button>
                    <button
                        onClick={() => handleNumInput("5")}
                        className={styles.button}
                    >
                        5
                    </button>
                    <button
                        onClick={() => handleNumInput("6")}
                        className={styles.button}
                    >
                        6
                    </button>
                    <button
                        onClick={() => handleOperator({symbol: "-", func: (num1, num2) => subtract(num1, num2)})}
                        className={styles.button}
                    >
                        -
                    </button>
                    <button
                        onClick={() => handleNumInput("1")}
                        className={styles.button}
                    >
                        1
                    </button>
                    <button
                        onClick={() => handleNumInput("2")}
                        className={styles.button}
                    >
                        2
                    </button>
                    <button
                        onClick={() => handleNumInput("3")}
                        className={styles.button}
                    >
                        3
                    </button>
                    <button
                        onClick={() => handleOperator({symbol: "+", func: (num1, num2) => add(num1, num2)})}
                        className={styles.button}
                    >
                        +
                    </button>
                    <button
                        onClick={() => handleNumInput("0")}
                        className={styles.button}
                    >
                        0
                    </button>
                    <button
                        onClick={handleDecimalInput}
                        className={styles.button}
                    >
                        .
                    </button>
                    <button
                        onClick={handleEquals}
                        className={`${styles.button} ${styles.spanTwo}`}
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    )
}