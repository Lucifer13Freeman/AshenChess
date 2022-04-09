import { PieceType, Square } from "chess.js";


export enum PLAYERS
{
    WHITE = 'WHITE',
    BLACK = 'BLACK'
}

export enum COLORS
{
    WHITE = 'w',
    BLACK = 'b'
}

export type ColorType = 'w' | 'b';

export enum RESULTS
{
    CHECKMATE_WINNER = 'CHECKMATE - WINNER',
    DRAW_DEFAULT = '50 - MOVES - RULE',
    STALEMATE = 'STALEMATE',
    REPETITION = 'REPETITION',
    INSUFFICIENT_MATERIAL = 'INSUFFICIENT MATERIAL',
    UNKNOWN_REASON = 'UNKNOWN REASON'
}

export const DRAG_TYPE_PIECE = 'DRAG_TYPE_PIECE';
export const SAVEDGAME = 'SAVEDGAME';

export const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const DRAG_PIECE_SEPARATOR = '_';
export const PROMOTION_PIECES = ['r', 'n', 'b', 'q'];

export type PositionXYType = { x: number; y: number; };
export type MovePromotionType = 'b' | 'n' | 'r' | 'q' | undefined;
export type FullPieceType = { type: PieceType; color: ColorType; };
export type BoardType = (FullPieceType | null)[][];
export type SquareType = Square;


export interface IPromotion
{
    from: SquareType;
    to: SquareType;
    color: ColorType;
}

export type PromotionType = IPromotion | null;

export interface IGame 
{
    board?: BoardType;
    pendingPromotion?: PromotionType;
    turn?: ColorType;
    isGameOver?: boolean;
    result?: string | null;
}

export const DEFAULT = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
export const EXAMPLE = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5';
export const STALEMATE = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78';
export const CHECKMATE = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3';
export const INSUFICCIEN_MATERIAL = 'k7/8/n7/8/8/8/8/7K b - - 0 1';
