import { useEffect, useState } from "react"
import styles from "./WPMTest.module.css"
import { wordOptions } from "./wordOptions.js"

export function WPMTest() {

    const [words, setWords] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentWord, setCurrentWord] = useState("")

    const [timerStart, setTimerStart] = useState(0)
    const [timer, setTimer] = useState(0)
    const [results, setResults] = useState({
        WPM: 0,
        accuracy: 0.00
    })

    const handleKeyDown = (e) => {
        switch (e.key) {
            case " ":
                submitWord()
                break
            case "Enter":
                endTest()
            default:
                break
        }
    }

    const submitWord = () => {
        if (!currentWord) return

        const copy = [...words]
        copy[currentIndex].userSubmission = currentWord
        copy[currentIndex].submitted = true
        setWords(copy)
        setCurrentIndex(currentIndex + 1)
        setCurrentWord("")
    }

    const endTest = () => {
        // stop timer
        submitWord()
        setTimerStart(0)
        getResults()
    }

    const getResults = () => {
        const copy = {...results}
        let wordsCompleted = 0
        for (const word of words) {
            if (word.userSubmission) {
                wordsCompleted += 1
            }
        }
        copy.WPM = wordsCompleted * (60 / timer)

        let accurateWords = 0
        for (const word of words) {
            if (word.userSubmission === word.text) {
                accurateWords += 1
            }
        }
        copy.accuracy = (accurateWords/words.length).toFixed(2)

        setResults(copy)
    }

    const startTimer = () => {
        // set timer start
        setTimer(0)
        setTimerStart(Date.now())
    }

    useEffect(() => {
        // in the future maybe shuffle words before setting them
        const copy = [...wordOptions]
        copy.map((word) => {
            word.userSubmission = ""
            word.submitted = false
        })
        setWords(copy)
    }, [])

    useEffect(() => {
        if (currentWord === " ") {
            setCurrentWord("")
        }
    }, [currentWord])

    useEffect(() => {
        const interval = setInterval(() => {
            var delta = Date.now() - timerStart; // milliseconds elapsed since start
            setTimer(Math.floor(delta / 1000)); // in seconds
        }, 200); // update every x milliseconds

        // clearInterval not working
        if (!timerStart || timer > 500) {
            clearInterval(interval)
            setTimer(0)
        }
    }, [timerStart])


    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <button onClick={startTimer}>Start timer: </button>
                <span>{timer}</span>
                {
                    !results.WPM
                        ? ""
                        : <div>
                            <span>WPM: {results.WPM}</span>
                            <span>Accuracy: {parseInt(results.accuracy * 100)}%</span>
                        </div>
                }
            </div>
            <div className={styles.wordsContainer}>
                <input
                    type="text"
                    autoFocus={true}
                    value={currentWord}
                    onChange={(e) => setCurrentWord(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className={styles.console}
                />
                <span className={styles.wordsToType}>
                    {
                        words.map((word) => {
                            if (!word.submitted) {
                                return word.text + " "
                            }
                        })
                    }
                </span>
            </div>
        </div>
    )
}