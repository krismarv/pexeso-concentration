import React from 'react';
import '../css/board.css'
import refresh from '../refresh.png'

export default function Board ( props) {
    
    var imageElements = []
    imageElements = props.images.map((image, index) => {
        // console.log(props.clicked[`card-${index}`], `card-${index}`, props.clicked)
        return (
            <div className='card' key={index} onClick={props.flipCard} id={`card-${index}`}>
                <img src={image.download_url} style={{display: props.clicked[`card-${index}`]===true ? 'block' : 'none' }}></img>
            </div>
        )
    })    
    
      
      imageElements = imageElements.map((image, index) => {
          return ({
              ...image, 
              [image.props.id]: index
          })
      })
            
      let boardStyle = {
          gridTemplateColumns: 'repeat(' + props.fieldLength + ', '+ (100-2*(props.fieldLength-1))/props.fieldLength +'%)',
          gridTemplateRows: 'repeat(' + props.fieldLength + ', '+ (100-2*(props.fieldLength-1))/props.fieldLength +'%)'
        }
      
    return (
        <>
        {props.played ? <div className="new-move" onClick={props.newMove}>
            <img src={refresh}></img>
        </div> : ''}
            <div className='board' style={boardStyle}>
                {imageElements}
            </div>
        </>
    )
}