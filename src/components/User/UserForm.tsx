import { signInAnonymously } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import Button from "../../UI/Button/Button";


const UserForm: React.FC = () => 
{
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => 
    {
        e.preventDefault();
        localStorage.setItem('USERNAME', name);
        await signInAnonymously(auth);
    }

    
    return (
        <form className='user_form' onSubmit={handleSubmit}>
            <h1 className='text'>
                Enter your name to start
            </h1>
            <br/>
            <div>
                <p>
                    <input 
                        type='text'
                        name='' 
                        id=''
                        className='input'
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </p>
            </div>
            <div>
                <Button color='dark' type='submit' className='px-5'>
                    Start
                </Button>
            </div>
        </form>
    )
}

export default UserForm;