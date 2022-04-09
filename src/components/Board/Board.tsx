import { BoardType, 
        ColorType, 
        FullPieceType, 
        LETTERS, 
        PositionXYType } from '../../game/types';
import BoardSquare from './BoardSquare';
import { useEffect, useState } from 'react';
import './Board.scss';


interface IBoardProps
{
  board: BoardType;
  turn?: ColorType;
}

const Board: React.FC<IBoardProps> = ({ board, turn }) => 
{
  const [currBoard, setCurrBoard] = useState<(FullPieceType | null)[]>([]);

  useEffect(() => {
    setCurrBoard(
      turn === 'w' ? board.flat() : board.flat().reverse()
    );
  }, [board, turn]);

  const getPositionXY = (index: number): PositionXYType =>
  {
    // const x = index % 8;
    // const y = Math.abs(Math.floor(index / 8) - 7);

    const x = turn === 'w' ? index % 8 : Math.abs((index % 8) - 7);
    const y = turn === 'w'
                ? Math.abs(Math.floor(index / 8) - 7)
                : Math.floor(index / 8);
    return { x, y };
  }

  const isBlack = (index: number): boolean => 
  {
    const { x, y } = getPositionXY(index);
    return (x + y) % 2 === 1;
  }

  const getPosition = (index: number) =>
  {
    const { x, y, } = getPositionXY(index);
    const letter = LETTERS[x];
    return `${letter}${y + 1}`;
  }


  return (
    <div className='board_container'>
      <div className='board'>
        {currBoard.map((piece, index) => 
        (
          <div key={index} className='square'>
            <BoardSquare 
              piece={piece} 
              isBlack={isBlack(index)} 
              position={getPosition(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board;