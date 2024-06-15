import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Tooltip,
  XAxis,
  BarChart,
  Bar,
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

const BarVariant = ({data}: Props) => {
  const locale = es;
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"}/>
        <XAxis
          axisLine={false} 
          tickLine={false} 
          dataKey={"date"} 
          tickFormatter={(value) => format(value, "dd MMM", {locale})} style={{fontSize: "12px"}} 
          tickMargin={16} 
        />
        <Tooltip content={<CustomTooltip/>} />
        <Bar dataKey={"income"} fill='#3b82f6' className='drop-shadow-lg'/>
        <Bar dataKey={"expenses"} fill='#f43f5e' className='drop-shadow-lg'/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarVariant