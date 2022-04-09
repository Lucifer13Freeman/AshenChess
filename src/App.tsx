import Board from './components/Board/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { gameSubject, initGame } from './game/game';
import { useEffect, useState } from 'react';
import { TouchBackend } from 'react-dnd-touch-backend';
import './App.scss';
import Navbar from './layout/Navbar';
import { BoardType } from './game/types';


const App: React.FC = () => 
{
  const isMobile = window.innerWidth < 600;

  const initialBoardState: BoardType = [];
  const [board, setBoard] = useState(initialBoardState);

  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();

  useEffect(() => 
  {
    initGame();

    const subs = gameSubject.subscribe((game: any) => 
    { 
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    }); 

    return () => subs.unsubscribe();
  }, []);
  

  return (
    <div className='app'>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Navbar isGameOver={isGameOver} result={result}>
          <Board board={board} turn={turn}/>
        </Navbar>
      </DndProvider>
    </div>
  );
}

export default App;