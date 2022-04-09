interface ISquareProps
{
    isBlack: boolean;
}

const Square: React.FC<ISquareProps> = ({ children, isBlack }) => 
{
    const bgClass = isBlack ? 'square_black' : 'square_white';

    return (
        <div className={`${bgClass} board_square`}>{children}</div>
    )
}

export default Square;