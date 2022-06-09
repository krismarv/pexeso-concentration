import React from "react";
import "../css/new-game.css";
import {MdOutlinePeopleOutline} from "react-icons/md"

export default function NewGame (props) {

    function displayPlayer() {
        let screen = document.querySelector(".players-screen");
        screen.classList.remove("inactive")
    }

    return (
        <div className="new-game-container">
        <div className="new-game">
            Field size 
            <input type='number' step='2' onChange={props.changeFieldLength} value={props.formFieldLength} min='2' max='12'></input>
            <button onClick={props.startGame}>New Game</button>
        </div>
        <div className="players-display">
            <MdOutlinePeopleOutline onClick={displayPlayer} className="player-icon"/>
        </div>
        </div>
        
    )
    }