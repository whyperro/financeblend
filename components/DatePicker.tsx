import * as React from 'react';
import {format} from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react';
import {SelectSingleEventHandler} from 'react-day-picker'
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Popover, PopoverContent, PopoverTrigger
} from './ui/popover';
import {es} from 'date-fns/locale';

type Props = {
  value?: Date;
  onChange: SelectSingleEventHandler, 
  disabled: boolean,
}

export const DatePicker = ({
  value, onChange, disabled
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={disabled} variant={'outline'} className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}>
          <CalendarIcon className='size-4 mr-2' />
          {value ? format(value, "PPP", {locale: es}) : <span>Seleccione una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar lang='es' mode='single' selected={value} onSelect={onChange} disabled={disabled} initialFocus />
      </PopoverContent>
    </Popover>
  )
}