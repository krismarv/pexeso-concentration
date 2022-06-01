import React from "react";

export default function NewGame (props) {
    return (
        <>
            <input type='number' step='2' onChange={props.changeFieldLength} value={props.formFieldLength} min='2' max='12'></input>
            <button onClick={props.startGame}>Start a new game</button>
        </>
    )
    }