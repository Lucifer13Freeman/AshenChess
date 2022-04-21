import { auth, db } from "../../firebase/firebase";
import { useNavigate  } from 'react-router-dom'
import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import { INewGameOptions, NewGameOptionsType } from "../../game/types";


const newGameOptions: INewGameOptions[] = [
  { label: 'Black pieces', value: 'b' },
  { label: 'White pieces', value: 'w' },
  { label: 'Random', value: 'r' }
]

const HomePage: React.FC = () => 
{
  const { currentUser } = auth;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlePlayLocally = () => navigate(`/game/local`);

  const handlePlayOnline = () => setShowModal(true);

  const startOnlineGame = async (startingPiece: NewGameOptionsType) =>
  {
    const member = {
      uid: currentUser?.uid,
      piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
      name: localStorage.getItem('USERNAME'),
      creator: true
    }

    const game = {
      status: 'waiting',
      members: [member],
      gameId: `${Math.random().toString(36).substring(2, 9)}_${Date.now()}`
    }

    const docRef = collection(db, 'games');
    await setDoc(doc(docRef, game.gameId), game);

    navigate(`/game/${game.gameId}`);
  }

  // const config = JSON.parse(
  //   '{"apiKey":"AIzaSyAao54V87Lgu6QZVjA3-FhrN4sPVPq0Kfk","authDomain":"ashen-chess.firebaseapp.com","projectId":"ashen-chess","storageBucket":"ashen-chess.appspot.com","messagingSenderId":"777576568095","appId":"1:777576568095:web:392bab570bd8b877890c2a"}');

  
  // console.log(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG as string))


  return (
    <>
      <div className='home_page grid grid-cols-2 justify-evenly'>
          <div className='home_columns bg-slate-700'>
              <Button 
                color='light' 
                className='px-5' 
                onClick={handlePlayLocally}
              >
                Play Locally
              </Button>
          </div>
          <div className='home_columns bg-slate-400'>
              <Button 
                color='dark' 
                className='px-5' 
                onClick={handlePlayOnline}
              >
                  Play Online
              </Button>
          </div>
      </div>

      <Modal
        title='Select the piece you want to start'
        width={32}
        show={showModal}
        setShow={setShowModal}
        color='dark'
      >
        <div className='grid grid-cols-3 gap-2'>
          {newGameOptions.map(({ label, value }) => (
            <Button 
              key={value}
              className='px-5'
              color='light'
              onClick={() => startOnlineGame(value as NewGameOptionsType)}
            >
              {label}
            </Button>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default HomePage;