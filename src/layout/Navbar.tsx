import { resetGame } from '../game/game';


interface INavbarProps
{
    isGameOver?: boolean;
    result?: string;
}

const Navbar: React.FC<INavbarProps> = ({ children, isGameOver, result }) => 
{
    return (
        <>
        {isGameOver ? (
            <h2 className='vertical_text'>
                GAME OVER
                <button onClick={resetGame}>
                    <span className='vertical_text'>NEW GAME</span>
                </button>
            </h2>
        ) : (
            <h2 className='vertical_text'>
                <button onClick={resetGame}>
                    <span className='vertical_text'>RESTART GAME</span>
                </button>
            </h2>
        )}
        {children}
        {result && <p className='vertical_text'>{result}</p>}
        </>
    )
}

export default Navbar;