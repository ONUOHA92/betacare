/* eslint-disable react/display-name */
import Spinner from 'componentsDoctors/Spinner'
import React, { forwardRef } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  wd?: string
  hg?: string
  fs?: string
  className?: string
  ref?: string
  color: 'primary' | 'secondary' | 'tertiary' | 'neutral'
  isLoading?: boolean
  fiantBorder?: boolean
}

const Button = forwardRef(
  (
    {
      wd,
      hg,
      color,
      children,
      isLoading,
      fiantBorder,
      fs,
      className,
      ...props
    }: React.PropsWithChildren<Props>,
    ref
  ) => {
    return (
      <>
        <button {...props} className={`${className ? className : ''} button`}>
          {isLoading ? <Spinner /> : children}
        </button>
        <style jsx>{`
          .button {
            width: ${wd || '100%'};
            height: ${hg || '47px'};
            background-color: ${color === 'primary'
              ? '#1F56C3'
              : color === 'neutral'
              ? 'transparent'
              : color === 'tertiary'
              ? '#FFFFFF'
              : '#55ADFF'};
            color: ${color === 'neutral'
              ? '#000000'
              : color === 'tertiary'
              ? 'rgba(31, 86, 195, 1)'
              : '#ffffff'};
            padding: 0.5em;
            border: ${color === 'neutral'
              ? fiantBorder
                ? '1px solid #DCDCDC'
                : '1px solid #999999'
              : 'none'};
            border-radius: 5px;
            font-size: ${fs || 'inherit'};
            display: flex;
            gap: 16px;
            align-items: center;
            font-weight: 500;
            font-family: Poppins;
            line-height: 27px;
            justify-content: center;
            box-shadow: ${color === 'tertiary'
              ? 'box-shadow: 0px 2px 6px 2px #EDF2FB'
              : ''};
          }

          .button:hover:not(:disabled) {
            cursor: pointer;
            color: ${color === 'neutral' && '#ffffff'};
            background-color: ${fiantBorder
              ? '#fff'
              : color === 'secondary'
              ? '#1F56C3'
              : color === 'tertiary'
              ? '#fffff'
              : '#55ADFF'};
          }

          .button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `}</style>
      </>
    )
  }
)

export default Button
