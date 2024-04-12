import { useState } from "react"
import styles from "./CardMatch.module.css"
import { useEffect } from "react"

export function CardMatch() {

    const [cards, setCards] = useState([
        {type: "bg-red-700", reveal: false, matched: false},
        {type: "bg-red-700", reveal: false, matched: false},
        {type: "bg-orange-500", reveal: false, matched: false},
        {type: "bg-orange-500", reveal: false, matched: false},
        {type: "bg-yellow-400", reveal: false, matched: false},
        {type: "bg-yellow-400", reveal: false, matched: false},
        {type: "bg-green-500", reveal: false, matched: false},
        {type: "bg-green-500", reveal: false, matched: false},
        {type: "bg-cyan-500", reveal: false, matched: false},
        {type: "bg-cyan-500", reveal: false, matched: false},
        {type: "bg-blue-700", reveal: false, matched: false},
        {type: "bg-blue-700", reveal: false, matched: false},
        {type: "bg-purple-500", reveal: false, matched: false},
        {type: "bg-purple-500", reveal: false, matched: false},
        {type: "bg-stone-500", reveal: false, matched: false},
        {type: "bg-stone-500", reveal: false, matched: false},
    ])
    const [gameComplete, setGameComplete] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [availableClicks, setAvailableClicks] = useState(2)
    const [revealedCards, setRevealedCards] = useState([])

    const handleCardClick = (index) => {
        if (availableClicks > 0 && !cards[index].reveal && !cards[index].matched) {
            const copy = [...cards]
            copy[index].reveal = true
            setCards(copy)
            setAvailableClicks(availableClicks - 1)
            const copy2 = [...revealedCards]
            copy2.push(copy[index])
            setRevealedCards(copy2)
        }
    }

    const checkedForMatchedCards = () => {
        if (revealedCards[0].type === revealedCards[1].type) {
            const copy = [...cards]
            for (const card of copy) {
                if (card.type === revealedCards[0].type) {
                    card.matched = true
                }
            }
            setCards(copy)
        }
    }

    const checkForGameComplete = () => {
        let allCardsMatched = true
        for (const card of cards) {
            !card.matched ? allCardsMatched = false : ""
        }
        if (allCardsMatched) {
            setGameComplete(true)
        } else {
            resetTurn()
        }
        setAttempts(attempts + 1)
    }

    const resetTurn = () => {
        const copy = [...cards]
        for (const card of copy) card.reveal = false
        setCards(copy)
        setAvailableClicks(2)
        setRevealedCards([])
    }

    const resetGame = () => {
        shuffleCards()
        setGameComplete(false)
        setAttempts(0)
        setAvailableClicks(2)
        setRevealedCards([])
    }

    const shuffleCards = () => {
        const copy = [...cards]
        for (const card of copy) {
            card.reveal = false
            card.matched = false
        }
        let currentIndex = copy.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [copy[currentIndex], copy[randomIndex]] = [
                copy[randomIndex], copy[currentIndex]];
        }

        setCards(copy)
    }

    useEffect(() => {
        shuffleCards()
    },[])

    useEffect(() => {
        if (availableClicks <= 0) {
            checkedForMatchedCards()
            setTimeout(checkForGameComplete, 700)
        }
    },[availableClicks])


    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <span>Attempts: {attempts}</span>
                <button onClick={resetGame}>
                    Reset
                </button>
                {
                    !gameComplete
                        ? ""
                        : <span>Game complete!</span>
                }
            </div>
            <div className={styles.cardContainer}>
                {
                    cards.map((card, index) => {
                        return (
                            <div
                                onClick={() => handleCardClick(index)}
                                className={`${styles.card} ${card.reveal || card.matched ? card.type : "bg-gray-300"}`}
                            >
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}