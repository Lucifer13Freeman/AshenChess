import { Chess, Move, ShortMove } from 'chess.js';
import { DocumentData, DocumentSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { auth } from '../firebase/firebase';
import { IGame, 
        MovePromotionType, 
        PLAYERS, 
        DEFAULT, 
        PromotionType, 
        RESULTS, 
        SquareType, 
        IGameDoc, 
        GameDocRefType,
        IMember } from './types';
import { fromRef } from 'rxfire/firestore';


let gameRef: GameDocRefType | null;
let member: IMember;

const chess = new Chess(DEFAULT);


export let gameSubject: Observable<IGameDoc | IGame> | BehaviorSubject<IGameDoc | IGame>;

export const initGame = async (docRef: GameDocRefType | null) =>
{
    const { currentUser } = auth;

    if (docRef !== null) 
    {
        gameRef = docRef;

        const gameSnap = await getDoc(gameRef);

        const initialGame = await gameSnap.data();

        if (!initialGame || !currentUser) return 'notfound';

        const creator = initialGame.members.find((m: IMember) => m.creator === true);

        if (initialGame.status === 'waiting' 
            && creator.uid !== currentUser.uid) 
        {
            const currUser = {
                uid: currentUser.uid,
                name: localStorage.getItem('USERNAME'),
                piece: creator.piece === 'w' ? 'b' : 'w'
            }

            const updatedMembers = [...initialGame.members, currUser];

            await updateDoc(gameRef, { members: updatedMembers, status: 'ready' });
        } 
        else if (!initialGame.members
                    .map((m: IMember) => m.uid)
                    .includes(currentUser.uid) 
                && initialGame.members.length > 1) return 'intruder';

        chess.reset();

        gameSubject = fromRef(gameRef).pipe(
            map((gameDoc: DocumentSnapshot<IGameDoc | DocumentData>) => 
            {
                const game = gameDoc.data();

                if (!game) return {};
                
                const { pendingPromotion, gameData, ...restOfGame } = game;
                
                member = game.members.find((m: IMember) => m.uid === currentUser.uid);
                
                const oponent = game.members.find((m: IMember) => m.uid !== currentUser.uid);
                
                if (gameData) chess.load(gameData);

                const isGameOver = chess.game_over();

                return {
                    ...restOfGame,
                    board: chess.board(),
                    pendingPromotion,
                    isGameOver,
                    position: member.piece,
                    member,
                    oponent,
                    result: isGameOver ? getGameResult() : null,
                }
            })
        );
    }
    else 
    {
        gameRef = null;
        gameSubject = new BehaviorSubject({});

        const savedGame = localStorage.getItem('SAVEDGAME');
        if (savedGame) chess.load(savedGame);
        updateGame();
    }
}

export const resetGame = async () =>
{
    if (gameRef) 
    {
        await updateGame(null, true);
        chess.reset();
    }
    else 
    {
        chess.reset();
        updateGame();
    }
}

export const handleMove = (from: SquareType, to: SquareType) => 
{
    const promotions = chess.moves({ verbose: true }).filter((m: Move) => m.promotion);
    // console.table(promotions);

    let pendingPromotion: PromotionType = null;

    if (promotions.some((m: Move) => `${m.from}:${m.to}` === `${from}:${to}`)) 
    {
        // console.log('The User is going to promote!')
        pendingPromotion = { from, to, color: promotions[0].color };
        updateGame(pendingPromotion);
    }

    // const { pendingPromotion } = gameSubject.getValue();

    if (!pendingPromotion)  move(from, to);
}

export const move = (from: SquareType, to: SquareType, promotion?: MovePromotionType) => 
{
    let tempMove: ShortMove = { from, to };
    if (promotion) tempMove.promotion = promotion;

    // const legalMove = chess.move(tempMove);
    // if (legalMove) updateGame();

    // console.log({ tempMove, member }, chess.turn());

    if (gameRef)
    {
        if (member.piece === chess.turn()) 
        {
            const legalMove = chess.move(tempMove);
            if (legalMove) updateGame();
        }
    } 
    else 
    {
        const legalMove = chess.move(tempMove);
        if (legalMove) updateGame();
    }
}

const updateGame = async (pendingPromotion?: PromotionType, reset?: boolean) => 
{
    const isGameOver = chess.game_over();

    if (gameRef) 
    {
        const gameSnap = await getDoc(gameRef);

        const updatedData: Pick<IGameDoc, 'gameData' | 'pendingPromotion' | 'status'> = { 
            gameData: chess.fen(), 
            pendingPromotion: pendingPromotion || null,
            status: gameSnap.data()?.status
        }

        // console.log({ updateGame });

        if (reset && gameSnap.data()?.members.length > 1) updatedData.status = 'over';

        await updateDoc(gameRef, updatedData);
    } 
    else 
    {
        const newGame = {
            board: chess.board(),
            pendingPromotion,
            isGameOver,
            position: chess.turn(),
            result: isGameOver ? getGameResult() : null
        }

        localStorage.setItem('SAVEDGAME', chess.fen());

        if (gameSubject instanceof BehaviorSubject) gameSubject.next(newGame);
    }
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