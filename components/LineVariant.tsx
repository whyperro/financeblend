import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Tooltip,
  XAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import CustomTooltip from './CustomTooltip';

type Props = {
  data: {
    date: string,
    income: number,
    expenses: number,
  }[];
}

const LineVariant = ({data}: Props) => {
  const locale = es;
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"}/>
        <XAxis
          axisLine={false} 
          tickLine={false} 
          dataKey={"date"} 
          tickFormatter={(value) => format(value, "dd MMM", {locale})} style={{fontSize: "12px"}} 
          tickMargin={16} 
        />
        <Tooltip content={<CustomTooltip/>} />
        <Line dot={false} dataKey={"income"} stroke='#3b82f6' strokeWidth={2} className='drop-shadow-lg'/>
        <Line dot={false} dataKey={"expenses"} stroke='#f43f5e' strokeWidth={2} className='drop-shadow-lg'/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineVariant