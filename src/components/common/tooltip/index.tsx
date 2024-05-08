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
      <div className='flex w-[250px] flex-col text-ellipsis text-center'>{content}</div>
    </Tooltip>
  )
}

export default CustomTooltip
