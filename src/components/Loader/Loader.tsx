import Spinner from "../../UI/Spinner/Spinner";


interface ILoaderProps
{
    centered?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ centered = true }) => 
{
  return (
    <div className={centered ? 'loader_container' : ''}>
        <Spinner/>
    </div>
  )
}

export default Loader;