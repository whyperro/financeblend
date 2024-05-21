import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { insertCategoriesSchema } from '@/db/schema';
import { z } from 'zod';
import { useCreateCategory } from '../api/useCreateCategory';
import { useNewCategory } from '../hooks/useNewCategory';
import { AccountForm } from './CategoryForm';

const formSchema = insertCategoriesSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {

  const {isOpen, onClose} = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>
            Nueva Categoría
          </SheetTitle>
          <SheetDescription>
            ¡Crea una categoría para diferenciar tus transacciones!
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name: ""}}/>
      </SheetContent>
    </Sheet>
  )
};