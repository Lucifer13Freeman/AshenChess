interface IModalProps
{
    title?: string;
    hideTitle?: boolean;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    width?: number;
    height?: number;
    color?: 'dark' | 'light';
}

const Modal: React.FC<IModalProps> = (
    { 
        hideTitle = false, 
        show = false, 
        setShow, 
        title, 
        children, 
        footer,
        width,
        height,
        color
    }) =>
{
    const closeBtnColor = color === 'light' ? '#1e293b' 
                      : color === 'dark' ? '#cbd5e1' 
                      : 'currentColor';
    const isDark = color === 'dark';

    return (
        <div 
            aria-hidden='true' 
            className={show === true ? 'modal_showed' : 'hidden'}
        >
            <div className={`relative w-[${width || 32}rem] h-[${height || 10}rem] px-4 max-w-6xl max-h-[85vh] md:h-auto`}>
                {/* Modal content */}
                <div className={`relative ${isDark ? 'bg-slate-700' : 'bg-slate-400'} rounded-lg shadow`}>

                    {/* Modal header */}
                    {hideTitle === true ? <></> :
                        <>
                            <div className={`flex justify-between items-center p-5 rounded-t border-b 
                                ${isDark ? 'border-slate-400' : 'border-slate-700'}`}>
                                <h3 className={`modal_title ${isDark ? 'text-slate-400' : 'text-slate-700'}`}
                                >
                                    {title}
                                </h3>

                                <button 
                                    onClick={() => setShow(false)} 
                                    type='button' 
                                    className={`${isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-300'} rounded-md`}
                                    data-modal-toggle='defaultModal'
                                >
                                    <svg 
                                        className='w-5 h-5'
                                        fill={closeBtnColor}
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                        stroke={closeBtnColor}
                                    >
                                        <path 
                                            fillRule='evenodd'
                                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' 
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>}

                    {/* Modal body */}
                    <div className='p-6 space-y-6'>
                        {children}
                    </div>
                    {/* Modal footer */}
                    {footer && <div className='modal_footer'>
                        {footer}
                    </div>}
                </div>
            </div>
        </div>

    )
}

export default Modal;