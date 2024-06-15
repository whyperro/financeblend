import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Separator } from './ui/separator';
import { formatCurrency } from '@/lib/utils';

const CategoryTooltip = ({active, payload}: any) => {

  const locale = es; 

  if(!active) {
    return null;
  }

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className='rounded-sm bg-white shadow-sm border overflow-hidden'>
      <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>
        {name}
      </div>
      <Separator />
      <div className='flex items-center justify-between gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <div className='size-1.5 bg-rose-500 rounded-full' />
              <p className='text-sm text-muted-foreground'>Gastos</p>
          </div>
            <p className='text-sm text-right font-bold'>
              {formatCurrency(value * -1)}
            </p>
        </div>
    </div>
  )
}

export default CategoryTooltip