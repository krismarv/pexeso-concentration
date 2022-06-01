import React from "react";
import confetti from '../confetti.gif'


export default function Win (props) {
    return (
        <>
        <div className="win">
            <iframe src="https://embed.lottiefiles.com/animation/94888"></iframe>
            <div id="win-text">
                <p id="win-message">You won!</p>
                <button>New Game</button>
            </div>
        </div>
        </>
    )
}