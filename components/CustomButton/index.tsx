import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    wd?: string
    hg?: string
    fs?: string
    padding?: string
    className?: string
    ref?: string
    color: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'neutral-blue'
    isLoading?: boolean
}

function CustomButtom({ style, type, wd, hg, color,  padding,  children }: React.PropsWithChildren<Props>) {
    return (
        <button
            color={color}
            type={type}
            style={style}   
        >
            {children}
        </button>
    );
}

export default CustomButtom;