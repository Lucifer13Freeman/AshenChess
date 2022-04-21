interface IChewronIconProps
{
  type?: 'down' | 'up';
  color?: 'dark' | 'light';
}

const ChewronIcon: React.FC<IChewronIconProps> = ({ type, color }) => 
{
  const strokeColor = color === 'dark' ? '#1e293b' 
                      : color === 'light' ? '#cbd5e1' 
                      : 'currentColor';

  return (
    type === 'down' ?
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke={strokeColor}
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

      : type === 'up' ?
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24"  
        stroke={strokeColor}
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>

      : null
  )
}

export default ChewronIcon;