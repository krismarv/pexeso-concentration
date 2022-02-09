import './App.css';
import React from 'react'
import NewGame from './components/NewGame';
import Board from './components/Board';

function App() {

  const [images, setImages] = React.useState([]);
  const [sendingRequest, setSendingRequest] = React.useState(false);
  const [formFieldLength, setFormFieldLength] = React.useState(4);
  const [fieldLength, setFieldLength] = React.useState(4);
  const [clicked, setClicked] = React.useState({});
  const [clicks, setClicks] = React.useState(1);
  const [played, setPlayed] = React.useState(false);

  function changeFieldLength(event){
    setFormFieldLength(event.target.value)
  }

  // onClick start a new game
  function startGame() {
    setFieldLength(formFieldLength);
    setSendingRequest(old => !old);
  }
  
  // initialize image data
  React.useEffect(()=>{
    fetch(`https://picsum.photos/v2/list?page=2&limit=${Math.pow(fieldLength,2)/2}`)
      .then(res => res.json())
      .then(data => {
        data = data.concat(data);
        function shuffle(array) {
          let currentIndex = array.length,  randomIndex;
          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
        }
        return array;
      }
      shuffle(data);
      setImages(data)
      })

  }, [sendingRequest])

  // set CLICKED state object (used to flip cards)
  React.useEffect(()=>{
    let clickedObj = {}
    for (let i=0; i<Math.pow(fieldLength,2); i++) {
      clickedObj[`card-${i}`] = false
    }
    
    setClicked(clickedObj)
    }, [fieldLength])

    // CARD FLIPPING
    function flip(event) {
      console.log(clicks)
      setClicked(clicked => {
        return ({
          ...clicked, 
          [event.target.id]: true
        });
      })
    }

    function flipCard (event) {
      if (clicks === 1) {
        setClicks(click => click+1);
        flip(event);
      } else if (clicks === 2) {
        setClicks(click => click+1);
        flip(event);
        setPlayed(!played)
      } else {}
}

React.useEffect(()=>{
  if (played) {
    setTimeout(()=>{
      setClicks(1);
      setClicked(clicked => {
        Object.keys(clicked).forEach(key => clicked[key] = false)
        console.log("clicked", clicked)
        return clicked
      }) 
      }, 4000);
      setPlayed(!played)
  }
}, [played])

  return (
    <>
      <NewGame
        startGame={startGame}
        changeFieldLength={changeFieldLength}
        formFieldLength={formFieldLength}
        />
      {images.length ? <Board 
        images={images}
        fieldLength={fieldLength}
        clicked={clicked}
        flipCard={flipCard}
        /> 
        : ''}
    </>
    );
}

export default App;
