import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BoardType, 
        GameDocRefType, 
        IGameDoc, 
        InitResultType, 
        PositionType, 
        StatusType } from '../../game/types';
import { gameSubject, initGame } from '../../game/game';
import GameNavbar from '../../layout/GameNavbar';
import Board from '../../components/Board/Board';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import ShareLink from '../../components/ShareLink/ShareLink';
import Loader from '../../components/Loader/Loader';
import ErrorPage from '../error/ErrorPage';


const initialGameState: IGameDoc =
{
  gameId: undefined,
  status: undefined,
  members: undefined,
  position: undefined,
  member: undefined,
  oponent: undefined,
  gameData: undefined
}

const GamePage: React.FC = () => 
{
  const isMobile = window.innerWidth < 600;

  const initialBoardState: BoardType = [];
  const [board, setBoard] = useState<BoardType | undefined>(initialBoardState);

  const [isGameOver, setIsGameOver] = useState<boolean | undefined>(false);
  const [result, setResult] = useState<string | null | undefined>();
  const [position, setPosition] = useState<PositionType>();
  const [initResult, setInitResult] = useState<InitResultType>(null);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StatusType>();
  const [game, setGame] = useState(initialGameState);

  const { id } = useParams();
  const sharebleLink = window.location.href;

  useEffect(() => 
  {
    let subs: Subscription;

    async function init() 
    {
      const docRef: GameDocRefType | null = id !== 'local' 
                                            ? doc(db, `games/${id}`) as GameDocRefType 
                                            : null;
      const res = await initGame(docRef);

      setInitResult(res);
      setLoading(false);

      if (!res) 
      {
        subs = gameSubject.subscribe((game: IGameDoc) => 
        {
          setBoard(game.board)
          setIsGameOver(game.isGameOver)
          setResult(game.result)
          setPosition(game.position)
          setStatus(game.status)
          setGame(game)
        });
      }
    }

    init();

    return () => subs && subs.unsubscribe();
  }, [id]);
  
  if (initResult === 'notfound') return <ErrorPage text='Game not found'/>;
  if (initResult === 'intruder') return <ErrorPage text='The game is already full'/>;
  
  return (
    <div className='game_page'>
      {loading ? <Loader/> 
      : <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <GameNavbar isGameOver={isGameOver} result={result}>
          {board && 
            <Board 
              board={board} 
              position={position}
              oponent={game.oponent}
              member={game.member}
            /> 
          }
        </GameNavbar>
      </DndProvider>
      {status === 'waiting' && (
        <ShareLink sharebleLink={sharebleLink}/>
      )}
      </>}
    </div>
  );
}

export default GamePage;