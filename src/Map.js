import React, { useState, useEffect } from 'react';
import './Map.css';
import { v4 as uuidv4 } from 'uuid';
// Helper functions & photos
import { locations, goodLocations, isClose, randomPhoto, newGame, gameOver, gameOver2, mancuso, plan, davenport, assignShip, crazyIvan, magma, win, outOfControl, skip } from './helpers.js';
import Modal from './Modal.js';

function Map() {
  // Manage state for water locations, turns, sub locations, whether a game is in progress, showing the modal, and the modal's image
  const [ goodLocObjs, setGoodLocObjs ] = useState(goodLocations.map(loc => {
    return { location: loc, show: false, style: 'location' };
  }));
  const [ availableLocs, setAvailableLocs ] = useState(goodLocations);
  const [ redOctoberLocation, setRedOctoberLoc ] = useState(assignShip(availableLocs));
  const [ russianSubLocations, setRussianSubLocs ] = useState([assignShip(availableLocs), assignShip(availableLocs), assignShip(availableLocs), assignShip(availableLocs), assignShip(availableLocs)]);
  const [ turns, setTurns ] = useState(0);
  const [ startGame, setStartGame ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ image, setImage ] = useState(null);

  // Make sure 2 subs aren't assigned to same location by removing assigned locations from availableLocs everytime a sub location is assigned
  useEffect(() => {
    setAvailableLocs(prev => prev.filter(loc => loc !== redOctoberLocation || !russianSubLocations.includes(loc)));
  }, [redOctoberLocation, russianSubLocations]);

  // Helper Functions
  // Update map with respected location and show modal with appropriate image
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
  // Re-assign ship locations
  function reAssignShips() {
    setRedOctoberLoc(assignShip(availableLocs));
    setRussianSubLocs([assignShip(availableLocs), assignShip(availableLocs), assignShip(availableLocs), assignShip(availableLocs), assignShip(availableLocs)]);
  }
  // Event handler function for selecting location points in bodies of water
  function handleClick(event) {
    const { value } = event.target;
    const point = Number(value);
    setTurns(prev => prev + 1);
    // Render ose game meme and reset game after a certain number of turns
    if (turns >= 19) {
      updateMap(true, gameOver2, 'warmer', point);
      setStartGame(false);
      newGame(setGoodLocObjs, setTurns, setAvailableLocs, goodLocations);
      reAssignShips();
    // Render win game and reset game if you find the Red October
    } else if (redOctoberLocation === point) {
      updateMap(true, win, 'found-it', point);
      setStartGame(false);
      newGame(setGoodLocObjs, setTurns, setAvailableLocs, goodLocations);
      reAssignShips();
    // Render Seaman Jones meme for proximity to Red October
    } else if (isClose(redOctoberLocation, point)) {
      updateMap(true, magma, 'found-it', point);
    // Render Seaman Jones meme for proximity to hostile Russian subs
    } else if (russianSubLocations.some(subLoc => isClose(subLoc, point))) {
      updateMap(true, crazyIvan, 'warmer', point);
    // Render lose game meme and reset game if you find a hostile Russian sub
    } else if (russianSubLocations.includes(point)) {
      updateMap(true, gameOver, 'warmer', point);
      setStartGame(false);
      newGame(setGoodLocObjs, setTurns, setAvailableLocs, goodLocations);
      reAssignShips();
    // Render a random joke meme if you're not close to any subs
    } else {
      const photo = randomPhoto([plan, mancuso, outOfControl, skip, davenport])
      updateMap(true, photo, 'way-off', point);
    }
  }
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
      {// Display Start Game button if a game is not in progress
      !startGame &&
      <section className='reset-container'>
        <button className='reset-btn' onClick={() => setStartGame(true)}>START GAME</button>
      </section>}
    </main>
  );
}

export default Map;