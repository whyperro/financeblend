import {z} from 'zod';
import { Trash } from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form, 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { insertAccountSchema, insertTransactionSchema } from '@/db/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Select from '@/components/Select';
import { DatePicker } from '@/components/DatePicker';
import { Textarea } from '@/components/ui/textarea';
import { AmountInput } from '@/components/AmountInput';
import { convertAmountToMiliunits } from '@/lib/utils';

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>

type TransactionFormProps = {
  id?: string,
  defaultValues?: FormValues,
  onSubmit: (values: ApiFormValues) => void,
  onDelete?: () => void,
  disabled?: boolean,
  accountOptions: {label: string, value: string}[],
  categoryOptions: {label: string, value: string}[],
  onCategoryCreate: (name: string) => void,
  onAccountCreate : (name: string) => void,
}

export const TransactionForm = ({id, defaultValues, onDelete, onSubmit, disabled, accountOptions, categoryOptions, onCategoryCreate, onAccountCreate}: TransactionFormProps) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount)
    const amountInMiliuniuts = convertAmountToMiliunits(amount)
    onSubmit({
      ...values,
      amount: amountInMiliuniuts,
    }) 
  }

  const handleDelete = () => {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
        <FormField 
          name='date'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <>
                  <DatePicker value={field.value} onChange={field.onChange} disabled={false}/>
                  {!field.value && (
                    <p className='text-xs text-muted-foreground text-red-400'>Debe seleccionar una fecha...</p>
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          name='accountId'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Cuenta
              </FormLabel>
              <FormControl>
                <Select placeholder='Seleccione una cuenta..'
                  options={accountOptions}
                  onCreate={onAccountCreate}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          name='categoryId'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Categoría
              </FormLabel>
              <FormControl>
                <Select placeholder='Seleccione una categoría..'
                  options={categoryOptions}
                  onCreate={onCategoryCreate}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          name='payee'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Payee
              </FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder='' {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          name='amount'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Monto de su transacción
              </FormLabel>
              <FormControl>
                <AmountInput disabled={disabled} {...field} placeholder='0.00' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          name='notes'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Nota
              </FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ''}
                 disabled={disabled} placeholder='Notas adicionales...'/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? "Guardar cambios" : "Crear transacción"}
        </Button>
        {
          !!id && (
            <Button type='button' disabled={disabled} onClick={handleDelete} className='w-full' variant={'outline'}>
              <Trash className='size-2 mr-2'/> 
              Eliminar transacción
            </Button>
          )
        }
      </form>
    </Form>
  )
}