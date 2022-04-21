interface IButton extends React.HTMLProps<HTMLButtonElement>
{
    color?: 'light' | 'dark';
    type?: 'button' | 'submit'| 'reset';
    className?: string;
}

const Button: React.FC<IButton> = ({ children, className, color = 'light', ...rest }) =>
{
    const classes = `${className} ${color === 'light' ? 'btn_light' : 'btn_dark'}`

    return (
        <button
            className={classes}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button;