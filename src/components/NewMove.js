import React from "react";

export default function NewMove(props) {
    
    return (
        <>
            <div className="played">played</div>
            {props.played ? <div className="new-move" onClick={props.newMove}>New move</div> : ''}
            <div className="score">{props.score}</div>
        </>
    )
}