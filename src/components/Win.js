import React from "react";
import confetti from '../confetti.gif'


export default function Win (props) {
    return (
        <>
        <div className="win">
            <img src={confetti}></img>
        </div>
        </>
    )
}