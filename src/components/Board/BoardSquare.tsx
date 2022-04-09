import { DRAG_TYPE_PIECE, 
        DRAG_PIECE_SEPARATOR, 
        FullPieceType, 
        SquareType, 
        PromotionType } from "../../game/types";
import Piece from "./Piece";
import Square from "./Square";
import { useDrop } from 'react-dnd';
import { handleMove, gameSubject } from '../../game/game';
import { useEffect, useState } from "react";
import Promote from "./Promote";


interface IBoardSquareProps
{
    piece: FullPieceType | null;
    isBlack: boolean;
    position: string;
}

const BoardSquare: React.FC<IBoardSquareProps> = ({ piece, isBlack, position }) => 
{
  const [promotion, setPromotion] = useState<PromotionType>(null)
  
  const [, drop] = useDrop(
  {
    accept: DRAG_TYPE_PIECE,
    drop: (item: any) => {
      const [fromPosition] = item.id.split(DRAG_PIECE_SEPARATOR);
      handleMove(fromPosition, position as SquareType);
    }
  });

  useEffect(() => 
  {
    const subs = gameSubject.subscribe(
      ({ pendingPromotion }) =>
        pendingPromotion && pendingPromotion.to === position
          ? setPromotion(pendingPromotion)
          : setPromotion(null)
    );

    return () => subs.unsubscribe();
  }, [position])

  
  return (
    <div className={'board_square'} ref={drop}>
        <Square isBlack={isBlack}>
          { promotion ? 
          ( <Promote promotion={promotion}/> ) 
          : piece ? 
          <Piece piece={piece} position={position}/> 
          : null }
        </Square>
    </div>
  )
}

export default BoardSquare;
