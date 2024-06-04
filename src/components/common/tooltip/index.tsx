import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type CustomTooltipProps = {
  id: string
  content: string
}

const CustomTooltip = ({ id, content }: CustomTooltipProps) => {
  return (
    <Tooltip anchorSelect={`#${id}`} place='top'>
      <div className={`backdrop w-fit max-w-[330px] overflow-hidden text-wrap text-center text-[12px] `}>{content}</div>
    </Tooltip>
  )
}

export default CustomTooltip
