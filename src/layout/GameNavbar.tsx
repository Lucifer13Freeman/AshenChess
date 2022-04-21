import { resetGame } from '../game/game';
import Button from '../UI/Button/Button';


interface INavbarProps
{
    isGameOver?: boolean;
    result?: string | null;
}

const GameNavbar: React.FC<INavbarProps> = (
    { children, 
        isGameOver, 
        result }) => 
{
    return (
        <>
        {isGameOver ? (
            <h2 className='vertical_text text-slate-200 flex items-center'>
                <span className='mb-4'>GAME OVER</span>
                <div>
                    <Button onClick={resetGame} color='light'>
                        <span className='vertical_text'>NEW GAME</span>
                    </Button>
                </div>
            </h2>
        ) : (
            <h2 className='vertical_text'>
                <Button onClick={resetGame} color='light'>
                    <span className='vertical_text'>RESTART GAME</span>
                </Button>
            </h2>
        )}
        <div className='m-2'>
            {children}
        </div>
        {result && <p className='vertical_text text-slate-200'>{result}</p>}
        </>
    )
}

export default GameNavbar;