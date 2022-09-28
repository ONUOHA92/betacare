import React from 'react'
import Image from 'next/image'
import styles from './style.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  adornment?: any
  icon?: any
  label?: string
  onAdornmentClick?: () => void
  adornmentAlt?: string
  iconAlt?: string
  error?: string | null
  styleName?: string
  notify?: string
  placeholder?: string
  height?: string
}

const Input = ({
  adornment,
  height,
  icon,
  label,
  onAdornmentClick,
  iconAlt,
  adornmentAlt,
  error,
  notify,
  placeholder,
  styleName,
  ...props
}: InputProps) => {
  return (
    <div className={styleName}>
      <label
        className={styles.label}
        id={`label-${props.name}`}
        htmlFor={props.name}
      >
        {label}
      </label>
      <div
        className={`${styles.group} ${error ? `${styles.error}` : ''}`}
        style={{ height: height ? `${height}!important` : '' }}
      >
        {icon && (
          <div className={styles.icon}>
            <Image src={icon} height="15px" width="15px" alt={iconAlt} />
          </div>
        )}
        <input
          {...props}
          className={
            error
              ? `${styles.input} ${styles.inputError} ${props.className}`
              : `${styles.input} ${props.className}`
          }
          placeholder={placeholder}
          aria-labelledby={`label-${props.name}`}
        />
        {adornment && (
          <div className={styles.adorn}>
            <Image
              src={adornment}
              height="15px"
              width="15px"
              alt={adornmentAlt}
              onClick={onAdornmentClick}
            />
          </div>
        )}
      </div>

      {error !== null && <small className={styles.small}>{error}</small>}
      {notify && <small>{notify}</small>}
    </div>
  )
}

export default Input
