import React from 'react'

type SvgProps = {
  width?: string
  height?: string
  viewBox?: string
  fill?: string
  pathFill?: string
  className?: string
  onClick?: () => void
  d?: string
  stroke?: string
  fillRule?: 'evenodd' | 'inherit' | 'nonzero'
  clipRule?: string
}

const Svg = ({
  width,
  height,
  viewBox,
  fill,
  className,
  onClick,
  d,
  stroke,
  fillRule,
  clipRule,
  pathFill,
}: React.PropsWithChildren<SvgProps>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d={d} fill={pathFill} fillRule={fillRule} clipRule={clipRule} />
    </svg>
  )
}

export default Svg
