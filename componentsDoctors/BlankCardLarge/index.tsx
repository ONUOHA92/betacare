import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface Props {
  wd?: string
  hg?: string
  bdr?: string
  bdw?: string
  bdc?: string
  aofy?: boolean //allow-overflow-y => allowing overflow on the y axis
}

const BlankCardLarge = ({
  wd,
  hg,
  children,
  bdr,
  bdw,
  bdc,
  aofy,
}: React.PropsWithChildren<Props>) => {
  const borderWidth = bdw ? `${bdw}!important` : '1px'
  const borderColor = bdc ? `${bdc}!important` : 'inherit'
  return (
    <Card
      sx={{
        width: wd,
        height: hg,
        boxShadow: 'none!important',
        borderRadius: bdr ? `${bdr}!important` : 'inherit',
        border: `${borderWidth} solid  ${borderColor}`,
        overflowY: aofy ? 'auto' : 'none',
      }}
    >
      <CardContent sx={{ padding: '0!important' }}>{children}</CardContent>
    </Card>
  )
}

export default BlankCardLarge
