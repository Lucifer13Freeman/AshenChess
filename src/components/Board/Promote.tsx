import { move } from '../../game/game';
import { DRAG_PIECE_SEPARATOR, 
        IPromotion,
        MovePromotionType, 
        PROMOTION_PIECES } from '../../game/types';
import Square from './Square';


const promotionPieces = PROMOTION_PIECES;

interface IPromoteProps
{
    promotion: IPromotion | null;
}

const Promote: React.FC<IPromoteProps> = ({ promotion }) => 
{
    return (
        <div className='board'>
        {promotion && promotionPieces.map((piece, index) => (
            <div key={index} className='promote_square'>
                <Square isBlack={index % 3 === 0}>
                    <div
                        className='piece_container'
                        onClick={() => move(promotion.from, promotion.to, piece as MovePromotionType)}
                    >
                        <img
                            src={require(`../../assets/images/${piece}${DRAG_PIECE_SEPARATOR}${promotion.color}.png`)}
                            alt=''
                            className='piece_img cursor-pointer'
                        />
                    </div>
                </Square>
            </div>
        ))}
        </div>
    )
}

export default Promote;