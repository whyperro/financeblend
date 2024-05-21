import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { insertCategoriesSchema } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertCategoriesSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>;

type CategoryFormProps = {
  id?: string,
  defaultValues?: FormValues,
  onSubmit: (values: FormValues) => void,
  onDelete?: () => void,
  disabled?: boolean
}

export const AccountForm = ({id, defaultValues, onDelete, onSubmit, disabled}: CategoryFormProps) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  }

  const handleDelete = () => {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
        <FormField 
          name='name'
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Nombre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  autoComplete='none'
                  disabled={disabled}
                  placeholder='e.j Efectivo, Banco, Tarjeta Credito/Debito'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? "Guardar cambios" : "Crear categoria"}
        </Button>
        {
          !!id && (
            <Button type='button' disabled={disabled} onClick={handleDelete} className='w-full' variant={'outline'}>
              <Trash2 className='size-1 mr-2'/>
              Eliminar categoría
            </Button>
          )
        }
      </form>
    </Form>
  )
}