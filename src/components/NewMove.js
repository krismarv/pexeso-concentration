import React from "react";

export default function NewMove(props) {
    
    return (
        <>
            {props.played ? <div className="new-move" onClick={props.newMove}>New move</div> : ''}
            <div className="score">
                <h2>Score</h2>
                {props.score}
            </div>
        </>
    )
}