import React, { useState } from 'react';
import './Map.css';
import { v4 as uuidv4 } from 'uuid';
import { locations, goodLocations, redOctoberLocation, russianSubLocations,     isClose, randomPhoto, gameOver, gameOver2, mancuso, plan, davenport, crazyIvan, magma, win, outOfControl, skip } from './helpers.js';
import Modal from './Modal.js';

function Map() {
  // Manage state for water locations, turns, whether attacked, showing the modal, and the modal's image
  const [ goodLocObjs, setGoodLocObjs ] = useState(goodLocations.map(loc => {
    return { location: loc, show: false, style: 'location' };
  }));
  const [ turns, setTurns ] = useState(0);
  const [ startGame, setStartGame ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ image, setImage ] = useState(null);
  // Helper function for updating the map
  function updateMap(modal, image, style, val) {
    setShowModal(modal);
    setImage(image);
    setGoodLocObjs(prev => {
      const updatedObjs = prev.map(loc => {
        if (loc.location === val) {
          console.log('found it');
          loc.show = true;
          loc.style = style;
        }
        return {...loc};
      });
      return updatedObjs;
    });
  }
  // Helper function to clear board
  function newGame() {
    setGoodLocObjs(prev => {
      const cleanMap = prev.map(loc => {
        loc.show = false;
        loc.style = 'location';
        return {...loc};
      });
      return cleanMap;
    });
    setTurns(0);
  }
  // Event handler function for starting / re-starting a game
  function handleRestart() {
    setStartGame(true);
  }
  // Event handler function for selecting location points in bodies of water
  function handleClick(event) {
    const { value } = event.target;
    const point = Number(value);
    setTurns(prev => prev + 1);
    if (turns >= 19) {
      updateMap(true, gameOver2, 'warmer', point);
      setStartGame(false);
      newGame();
    } else if (redOctoberLocation === point) {
      updateMap(true, win, 'found-it', point);
      setStartGame(false);
      newGame();
    } else if (isClose(redOctoberLocation, point)) {
      updateMap(true, magma, 'warmer', point);
    } else if (russianSubLocations.some(subLoc => isClose(subLoc, point))) {
      updateMap(true, crazyIvan, 'warmer', point);
    } else if (russianSubLocations.includes(point)) {
      updateMap(true, gameOver, 'warmer', point);
      setStartGame(false);
      newGame();
    } else {
      const photo = randomPhoto([plan, mancuso, outOfControl, skip, davenport])
      updateMap(true, photo, 'way-off', point);
    }
  };
  // Render Map to the screen
  return (
    // If show modal is true, render the modal with the appropriate feedback meme
    <main>
      {showModal && <Modal props={{ image, setShowModal }}/>}
      {startGame &&
      // Render the map only if you or the Red October haven't been attacked
      <section className='map'>
        {locations.map(loc => {
          // Place invisible clickable buttons throughout the bodies of water on the map, including an event handler for checking what's at the location of each button on clicking it
          if (goodLocations.includes(loc)) {
            return (
              <button
                className={goodLocObjs.find(locObj => locObj.location === loc).style}
                onClick={handleClick}
                value={loc}
                key={uuidv4()}> X </button>
            );
          } else {
            // Please non-clickable divs throughout land masses on the map
            return (
              <div key={uuidv4()}></div>
            );
          }
        })}
      </section>}
      {!startGame &&
      <section className='reset-container'>
        <button className='reset-btn' onClick={handleRestart}>START GAME</button>
      </section>}
    </main>
  );
}

export default Map;