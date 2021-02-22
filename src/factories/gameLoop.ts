import Ship from '../factories/shipFactory';
import GameBoard from '../factories/gameBoardFactory';
import Player from '../factories/playerFactory';
import Computer from '../factories/computerFactory';

/*Start Game*/
const humanPlayer = new Player();
humanPlayer.initHumanPlayer();
const computerPlayer = new Computer();
computerPlayer.initComputerPlayer();

/*Place Computer Player Ships*/
const setupComputerPlayer = () => {
  computerPlayer.placeShipHorizontal(0, 4);//0,1,2,3,4
  computerPlayer.placeShipHorizontal(80, 3);//81,82,83
  computerPlayer.placeShipVertical(25, 3); //25,35,45
  computerPlayer.placeShipHorizontal(12, 3);//12,13,14
  computerPlayer.placeShipVertical(60, 2);//60, 70
}
setupComputerPlayer();

/*Take player choices and place ships*/
//Testing purposes
humanPlayer.placeShipHorizontal(0, 4);//0,1,2,3,4
humanPlayer.placeShipHorizontal(80, 3);//81,82,83
humanPlayer.placeShipVertical(25, 3); //25,35,45
humanPlayer.placeShipHorizontal(12, 3);//12,13,14
humanPlayer.placeShipVertical(60, 2);//60, 70

