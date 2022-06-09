import React from "react";
import confetti from '../confetti.gif';
import "../css/win.css"


export default function Win (props) {
    let winMessage="";
    if (props.players===1) {
        winMessage="You win!"
    } else if (props.players===2) {
        switch (true) {
            case props.win.player1&&props.win.player2:
                winMessage = "It's a tie";
                break;
            case props.win.player1&&!props.win.player2:
                winMessage = "Player 1 wins";
                break;
            case !props.win.player1&&props.win.player2:
                winMessage = "Player 2 wins";
                break;
            default:
                winMessage = "It's a win!"
        }
        console.log(props.win)
        return (
            <>
            <div className="win">
                <iframe src="https://embed.lottiefiles.com/animation/94888"></iframe>
                <div id="win-text">
                    <p id="win-message">{winMessage}</p>
                    <button onClick={props.startGame}>New Game</button>
                </div>
            </div>
            </>
        )
    } 
}