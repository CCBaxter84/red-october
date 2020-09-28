// Import photos
import gameOver from './images/game-over4.jpg';
import gameOver2 from './images/game-over3.jpg';
import crazyIvan from './images/crazy-ivan3.jpg';
import plan from './images/plan2.jpg';
import magma from './images/magma3.jpg';
import win from './images/win2.jpg';
import davenport from './images/davenport.jpg';
import mancuso from './images/mancuso.jpg';
import outOfControl from './images/out-of-control.jpg';
import skip from './images/skip.jpg';

// Create an array to hold 256 point location values in a 16 x 16 grid for the map
const locations = [];
let num = 1;
while (num <= 256) {
  locations.push(num);
  num++;
}
// Filter the locations to exclude land masses (i.e., to be only be bodies of water)
const badLocations = [
  1, 2, 3, 4, 16, 17, 18, 19, 20, 21, 33, 34, 35, 36, 37, 49, 50, 51, 52, 53, 54,65, 66, 67, 68, 69, 70, 80, 81, 82, 83, 84, 95, 96, 97, 98, 99, 100, 101, 111, 112, 113, 114, 115, 116, 127, 128, 129, 130, 131, 142, 145, 146, 147, 161, 162, 163, 175, 190, 191, 192, 206, 207, 208, 221, 222, 223, 224, 237, 238, 239, 240, 241, 253, 254, 255, 256
];
const goodLocations = locations.filter(loc => !badLocations.includes(loc));
const availableLocs = [...goodLocations];
// Helper function for determining proximity to Russian subs
function isClose(tgt, num) {
  const close = [num - 15, num - 16, num - 17, num + 1, num - 1, num + 15, num + 16, num + 17];
  return close.includes(tgt);
}
// Helper function for randomly selecting a photo
function randomPhoto(photos) {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
}
// Helper function to clear board
function newGame(stateSetter1, stateSetter2, stateSetter3, locs) {
  stateSetter1(prev => {
    const cleanMap = prev.map(loc => {
      loc.show = false;
      loc.style = 'location';
      return {...loc};
    });
    return cleanMap;
  });
  stateSetter2(0);
  stateSetter3(locs);
}
// Helper function for assigning Ship Locs
function assignShip(location) {
  const randomIndex = Math.floor((Math.random() * location.length));
  const shipLocation = location[randomIndex];
  return shipLocation;
}
// Export the all location, body of water location, and the sub location variables
export { locations, goodLocations, availableLocs, isClose, randomPhoto, newGame, gameOver, gameOver2, mancuso, plan, davenport, assignShip, crazyIvan, magma, win, outOfControl, skip };