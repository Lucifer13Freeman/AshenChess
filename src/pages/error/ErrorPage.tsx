interface IErrorPageProps
{
  text?: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({ text = 'There was an error!' }) => 
{
  return (
    <div className='error_page'>
      <h1 className='error_text'>
        {text}
      </h1>
    </div>
  )
}

export default ErrorPage;