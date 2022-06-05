import React from "react";
import "../css/new-game.css"

export default function NewGame (props) {
    return (
        <div className="new-game">
            Field size 
            <input type='number' step='2' onChange={props.changeFieldLength} value={props.formFieldLength} min='2' max='12'></input>
            <button onClick={props.startGame}>New Game</button>
        </div>
    )
    }