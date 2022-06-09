import React from "react";

export default function NewMove(props) {
    
    return (
        <>
            <div className="score">
                {props.players===1 
                    ? <h2>Score: {props.score.player1}</h2> 
                    : <div><h2 className={`player ${props.currentPlayer==="player1" ? "active" : ""}`}>Player 1: {props.score.player1}</h2>
                      <h2 className={`player ${props.currentPlayer==="player2" ? "active" : ""}`}>Player 2: {props.score.player2}</h2></div>}
            </div>
        </>
    )
}