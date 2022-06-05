import './App.css';
import React from 'react'
import NewGame from './components/NewGame';
import Board from './components/Board';
import NewMove from './components/NewMove';
import Win from './components/Win'

function App() {

  const [images, setImages] = React.useState([]);
  const [sendingRequest, setSendingRequest] = React.useState(false);
  const [formFieldLength, setFormFieldLength] = React.useState(4);
  const [fieldLength, setFieldLength] = React.useState(4);
  const [clicked, setClicked] = React.useState({});
  const [clicks, setClicks] = React.useState(1);
  const [played, setPlayed] = React.useState(false);
  const [score, setScore] = React.useState(0)
  const [win, setWin] = React.useState(false)

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

  // initialize CLICKED state object (used to flip cards)
  React.useEffect(()=>{
    let clickedObj = {}
    for (let i=0; i<Math.pow(fieldLength,2); i++) {
      clickedObj[`card-${i}`] = false
    }
    
    setClicked(clickedObj)
    }, [fieldLength])

    // CARD FLIPPING
    function flip(event) {
      
      setClicked(clicked => {
        return ({
          ...clicked, 
          [event.target.id]: true
        });
      }
      )
    }

    // increment score on clicked change
    React.useLayoutEffect(()=>{
      console.log(score);
      console.log("clicked changes")
      let keysTrue = Object.keys(clicked).filter((k)=> clicked[k]).map((item)=> parseInt(item.replace("card-", "")));
      if (images[keysTrue[0]]===images[keysTrue[1]]&&images[keysTrue[0]]) {
        setScore(score +1)
      }
    }, [clicks])

    // win
    React.useEffect(()=>{
      console.log(score)
      if (score===Math.pow(fieldLength, 2)/2) {
        setWin(!win)
      }
    }, [score])

    function flipCard (event) {
      if (clicks === 1) {
        setPlayed(false)
        setClicks(click => click+1);
        flip(event);
      } else if (clicks === 2) {
        setClicks(click => click+1);
        flip(event);
        setPlayed(!played)
      } else {}
}

// React.useEffect(()=>{
//   console.log(played)
//   if (played) {
//     setTimeout(()=>{
//       setClicks(1);
//       setClicked(clicked => {
//         Object.keys(clicked).forEach(key => clicked[key] = false)
//         console.log("clicked", clicked)
//         return clicked
//       }) 
//       }, 4000);
//   }
// }, [played])

function newMove () {
  setClicks(1);
  setClicked(clicked => {
    Object.keys(clicked).forEach(key => clicked[key] = false)
    console.log("clicked", clicked)
    return clicked
  }) 
}

  return (
    <>
      <div className="nav">
      <h1>P A I R S</h1>
      <NewGame
        startGame={startGame}
        changeFieldLength={changeFieldLength}
        formFieldLength={formFieldLength}
        />
      </div>
      <div className="ribbon">
        <NewMove 
          played={played}
          newMove={newMove}
          score={score}
        />
      </div>
      {images.length ? <Board 
        images={images}
        fieldLength={fieldLength}
        clicked={clicked}
        flipCard={flipCard}
        /> 
        : ''}
      {win ? <Win/> : ""}
    </>
    );
}

export default App;
