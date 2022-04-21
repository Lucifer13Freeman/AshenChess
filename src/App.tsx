import { Navigate, Route, Routes } from 'react-router-dom';
import GamePage from './pages/game/GamePage';
import HomePage from './pages/home/HomePage';
import DynamicRouter from './router/DynamicRouter';


const App: React.FC = () => 
{
  return (
    <div className='app'>
      <DynamicRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/game/:id' element={<GamePage/>}/>
          {/* <Route path='/auth' element={<AuthPage/>}/> */}
          <Route path='*' element={<Navigate to='/' replace/>}/>
        </Routes>
      </DynamicRouter>
    </div>
  );
}

export default App;