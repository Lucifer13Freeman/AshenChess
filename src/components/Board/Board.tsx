import { BoardType, 
        FullPieceType, 
        IMember, 
        LETTERS, 
        PositionType, 
        PositionXYType } from '../../game/types';
import BoardSquare from './BoardSquare';
import { useEffect, useState } from 'react';


interface IBoardProps
{
  board: BoardType;
  position?: PositionType;
  member?: IMember;
  oponent?: IMember;
}

const Board: React.FC<IBoardProps> = ({ board, position, member, oponent }) => 
{
  const [currBoard, setCurrBoard] = useState<(FullPieceType | null)[]>([]);

  useEffect(() => {
    setCurrBoard(
      position === 'w' ? board.flat() : board.flat().reverse()
    );
  }, [board, position]);

  const getPositionXY = (index: number): PositionXYType =>
  {
    const x = position === 'w' ? index % 8 : Math.abs((index % 8) - 7);
    const y = position === 'w'
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
      {oponent && oponent.name && <span className='oponent_tag'>{oponent.name}</span>}
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
      {member && member.name && <span className='member_tag'>{member.name}</span>}
    </div>
  )
}

export default Board;