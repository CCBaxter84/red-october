// Import photos
import gameOver from './images/game-over4.jpg';
import gameOver2 from './images/game-over3.jpg';
import crazyIvan from './images/crazy-ivan3.jpg';
import plan from './images/plan2.jpg';
import magma from './images/magma2.jpg';
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
// Randomly assign a ship to one of body of water point locations
function assignShip() {
  const randomIndex = Math.floor((Math.random() * availableLocs.length));
  const shipLocation = availableLocs[randomIndex];
  availableLocs.splice(randomIndex, 1);
  return shipLocation;
}
// Place the Red October and 5 enemy Russian subs randomly on the map
const redOctoberLocation = assignShip();
const russianSub1Loc = assignShip();
const russianSub2Loc = assignShip();
const russianSub3Loc = assignShip();
const russianSub4Loc = assignShip();
const russianSub5Loc = assignShip();
const russianSubLocations = [russianSub1Loc, russianSub2Loc, russianSub3Loc, russianSub4Loc, russianSub5Loc];
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
// Export the all location, body of water location, and the sub location variables
export { locations, goodLocations, redOctoberLocation, russianSubLocations, isClose, randomPhoto, gameOver, gameOver2, mancuso, plan, davenport, crazyIvan, magma, win, outOfControl, skip };