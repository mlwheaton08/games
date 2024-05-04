import { useState } from "react"

export function MouseMove() {
    const navHeight = 60
    const playerWidth = 50
    const playerHeight = 50

    const [playerCoordinates, setPlayerCoordinates] = useState({
        playerX: 4,
        playerY: 4
    })

    const handleMouseMove = (e) => {
        const copy = {...playerCoordinates}
        copy.playerX = e.pageX
        copy.playerY = e.pageY

        if (e.pageY <= navHeight + (playerHeight / 2)) {
            copy.playerY = navHeight + (playerHeight / 2)
        }
        
        setPlayerCoordinates(copy)
        
        console.log(e.pageX)
        console.log(e.pageY)
    }

    // document.addEventListener("mousemove", (e) => {
    //     if (e.pageY < (navHeight + (playerHeight / 2))) {
    //         const copy = {...playerCoordinates}
    //         copy.playerY = 60
    //     }
    // })


    return (
        <div
            id="mouse-move-container"
            onMouseMove={(e) => handleMouseMove(e)}
            className="relative mt-nav-height h-screen h-100 w-screen bg-blue-300"
        >
            <div
                // className={`absolute top-${playerCoordinates.playerY} left-${playerCoordinates.playerX} w-5 h-5 bg-red-500 rounded-full`}
                style={{
                    position: "fixed",
                    top: playerCoordinates.playerY,
                    left: playerCoordinates.playerX,
                    transform: "translate(-50%, -50%)",
                    width: `${playerWidth}px`,
                    height: `${playerWidth}px`,
                    borderRadius: "50%",
                    backgroundColor: "red"
                }}
            ></div>
        </div>
    )
}