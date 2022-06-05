import React from "react";
import confetti from '../confetti.gif';
import "../css/win.css"


export default function Win (props) {
    return (
        <>
        <div className="win">
            <iframe src="https://embed.lottiefiles.com/animation/94888"></iframe>
            <div id="win-text">
                <p id="win-message">You win!</p>
                <button>New Game</button>
            </div>
        </div>
        </>
    )
}