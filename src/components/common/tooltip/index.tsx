import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

type CustomTooltipProps = {
  id: string
  content: string
}

const CustomTooltip = ({ id, content }: CustomTooltipProps) => {
  return (
    <Tooltip anchorSelect={`#${id}`} place='top'>
      <div className='w-[250px] overflow-hidden text-wrap'>{content}</div>
    </Tooltip>
  )
}

export default CustomTooltip
