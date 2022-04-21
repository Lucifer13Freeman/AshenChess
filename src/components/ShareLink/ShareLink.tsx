import { useState } from "react";
import Button from "../../UI/Button/Button";
import ChewronIcon from "../../UI/Icons/ChewronIcon";


interface IShareLinkProps 
{
  sharebleLink?: string;
}

const ShareLink: React.FC<IShareLinkProps> = ({ sharebleLink }) => 
{
  const [open, setOpen] = useState(true);

  const copyToClipboard = async () => 
  {
    sharebleLink && await navigator.clipboard.writeText(sharebleLink);
  }
  
  return (
    <div 
      className={`share_game 
        ${open ? 'share_game_opened' : 'share_game_closed'}`
      }
    >
      <div>
        <strong className='text-slate-300'>Share this game to continue</strong>
        <button 
          className='float-right'
          onClick={() => setOpen(!open)}
        >
          <ChewronIcon 
            type={open ? 'down' : 'up'}
            color='light'
          />
        </button>
      </div>
      <div className='pt-2'>
        <div>
          <input 
            type='text'
            name='' 
            id='' 
            className='input' 
            readOnly 
            value={sharebleLink} 
          />
        </div>
        <div className='float-right'>
          <Button 
            className='px-5'
            color='dark' 
            onClick={copyToClipboard}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShareLink;