import { Chess, Move, ShortMove } from 'chess.js';
import { BehaviorSubject } from 'rxjs';
import { IGame, 
        MovePromotionType, 
        PLAYERS, 
        DEFAULT, 
        PromotionType, 
        RESULTS, 
        SquareType } from './types';


const chess = new Chess(DEFAULT);

export const gameSubject: BehaviorSubject<IGame> = new BehaviorSubject({});

export const initGame = () =>
{
    const savedGame = localStorage.getItem('SAVEDGAME');
    if (savedGame) chess.load(savedGame);
    updateGame();
}

export const resetGame = () =>
{
    chess.reset()
    updateGame()
}

export const handleMove = (from: SquareType, to: SquareType) => 
{
    const promotions = chess.moves({ verbose: true }).filter((m: Move) => m.promotion);
    // console.table(promotions);

    if (promotions.some((m: Move) => `${m.from}:${m.to}` === `${from}:${to}`)) 
    {
        // console.log('The User is going to promote!')
        const pendingPromotion: PromotionType = { from, to, color: promotions[0].color };
        updateGame(pendingPromotion);
    }

    const { pendingPromotion } = gameSubject.getValue();

    if (!pendingPromotion)
    {
        move(from, to);
    }
}

export const move = (from: SquareType, to: SquareType, promotion?: MovePromotionType) => 
{
    let tempMove: ShortMove = { from, to }
    if (promotion) tempMove.promotion = promotion

    const legalMove = chess.move(tempMove);
    if (legalMove) updateGame();
}

const updateGame = (pendingPromotion?: PromotionType) => 
{
    const isGameOver = chess.game_over();

    const newGame: IGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }

    localStorage.setItem('SAVEDGAME', chess.fen());
    gameSubject.next(newGame);
}

const getGameResult = () => 
{
    if (chess.in_checkmate())
    {
        const winner = chess.turn() === 'w' ? PLAYERS.BLACK : PLAYERS.WHITE;
        return `${RESULTS.CHECKMATE_WINNER} - ${winner}`;
    }
    else if (chess.in_draw())
    {
        let reason = RESULTS.DRAW_DEFAULT;

        if (chess.in_stalemate()) reason = RESULTS.STALEMATE;
        else if (chess.in_threefold_repetition()) reason = RESULTS.REPETITION;
        else if (chess.insufficient_material()) reason = RESULTS.INSUFFICIENT_MATERIAL;
        
        return `DRAW - ${reason}`
    } 
    else return RESULTS.UNKNOWN_REASON;
}