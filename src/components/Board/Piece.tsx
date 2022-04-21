import { DRAG_PIECE_SEPARATOR, DRAG_TYPE_PIECE, FullPieceType } from "../../game/types";
import { DragPreviewImage, DragSourceMonitor, useDrag } from 'react-dnd';


interface IPieceProps
{
  piece: FullPieceType;
  position: string;
}

const Piece: React.FC<IPieceProps> = ({ piece: { type, color }, position }) => 
{
  const piece_name = `${type}${DRAG_PIECE_SEPARATOR}${color}`;
  const pieceImg = require(`../../assets/images/${piece_name}.png`);

  const [{ isDraging }, drag, preview] = useDrag(
  {
    type: DRAG_TYPE_PIECE,
    item: { 
      type: DRAG_TYPE_PIECE, 
      id: `${position}${DRAG_PIECE_SEPARATOR}${piece_name}` 
    },
    collect: (monitor: DragSourceMonitor) => {
      return {isDraging: !!monitor.isDragging()}
    }
  });


  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg}/>
      <div 
        className='piece_container'
        ref={drag} 
        style={{ opacity: isDraging ? 0 : 1 }}
      >
        <img src={pieceImg} alt='' className='piece_img'/>
      </div>
    </>
  )
}

export default Piece;