import './App.css';
import React from 'react'
import NewGame from './components/NewGame';
import Board from './components/Board';
import NewMove from './components/NewMove';
import Win from './components/Win';
import Players from './components/Players'

function App() {

  const [images, setImages] = React.useState([]);
  const [sendingRequest, setSendingRequest] = React.useState(false);
  const [formFieldLength, setFormFieldLength] = React.useState(4);
  const [fieldLength, setFieldLength] = React.useState(4);
  const [clicked, setClicked] = React.useState({});
  const [clicks, setClicks] = React.useState(1);
  const [played, setPlayed] = React.useState(false);
  const [score, setScore] = React.useState({player1:0});
  const [win, setWin] = React.useState({player1:false});
  const [finished, setFinished] = React.useState(false)
  const [players, setPlayers] = React.useState(1);
  const [currentPlayer, setCurrentPlayer] = React.useState("player1")

  function changeFieldLength(event){
    setFormFieldLength(event.target.value)
  }

  // onClick start a new game
  function startGame() {
    setFieldLength(formFieldLength);
    setSendingRequest(old => !old);
    setFinished(false);
    let cards = document.querySelectorAll(".card");
    setScore(score=>{
      score.player1=0;
      if (players===2) {
        score.player2=0
      }
      return score
    })
    cards.forEach((card)=>{
      card.classList.remove("played")
    })
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
    React.useEffect(()=>{
      let classesTrue = Object.keys(clicked).filter((k)=> clicked[k])
      let keysTrue = classesTrue.map((item)=> parseInt(item.replace("card-", "")));
      if (images[keysTrue[0]]===images[keysTrue[1]]&&images[keysTrue[0]]) {
        console.log("hi there")
        setScore(score=> {
          return {
            ...score,
            [currentPlayer]:score[currentPlayer]+1
          }
        });
        if ((score!==Math.pow(fieldLength, 2)/2)) {
          classesTrue.forEach((cl) => {
            let element = document.getElementById(cl);
            element.classList.add("played")
          })
        }
      }
    }, [clicks])

    // win
    React.useEffect(()=>{
      console.log(win)
      if (players===1) {
        if (score.player1===Math.pow(fieldLength, 2)/2) {
          setFinished(true)
        }
      } else if (players===2) {
        let gameOver = score.player1+score.player2===Math.pow(fieldLength, 2)/2
        if (gameOver&&(score.player1>score.player2)) {
          console.log("player 1 wins")
          setFinished(true)
          setWin(winObj => {
            return {player1:true, player2:false}
          })
        } else if (gameOver&&(score.player1<score.player2)) {
          console.log("player 2 wins")
          setFinished(true)
          setWin(winObj => {
            return {player1:false, player2:true}
          }  )
        } else if (gameOver&&(score.player1===score.player2)) {
          console.log("itie")
          setFinished(true)
          setWin(winObj => {
            return {player1:true, player2:true}
          })
        }
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

// reset moves after 1 game
function newMove () {
  setClicks(1);
  setClicked(clicked => {
    Object.keys(clicked).forEach(key => clicked[key] = false)
    setPlayed(!played)
    return clicked
  }) 
    if (players === 2) {
      setCurrentPlayer(player => {
        if (player==="player1") {
          return "player2"
        }
          else {
            return "player1"
          } 
      })
    }
}

function numberOfPlayers (event) {
  let screen = document.querySelector(".players-screen");
  screen.classList.add("inactive")
}

function changeNumberOfPlayers(event) {
  setPlayers(parseInt(event.target.value));
}

React.useEffect(()=>{
  if (players===2) {
    setScore(score=>{
      score.player2=0;
      return score
    })
  }
}, [players])
 
  return (
    <>
      <Players
        numberOfPlayers={numberOfPlayers}
        changePlayers={changeNumberOfPlayers}
        players={players}
      />
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
          score={score}
          players={players}
          currentPlayer={currentPlayer}
        />
      </div>
      {images.length ? <Board 
        images={images}
        fieldLength={fieldLength}
        clicked={clicked}
        flipCard={flipCard}
        played={played}
        newMove={newMove}
        finished={finished}
        /> 
        : ''}
      {finished ? <Win
        players={players}
        win={win}
        startGame={startGame}/> : ""}
    </>
    );
}

export default App;
