import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { insertAccountSchema } from '@/db/schema';
import useConfirm from '@/hooks/useConfirm';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useDeleteCategory } from '../api/useDeleteCategory';
import { useEditCategory } from '../api/useEditCategory';
import { useGetCategory } from '../api/useGetCategory';
import { useOpenCategory } from '../hooks/useOpenCategory';
import { AccountForm } from './CategoryForm';

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {

  const [ConfirmationDialog, confirm] = useConfirm(
    "¿Estás seguro?",
    "Estás a punto de eliminar una categoria."
  )

  const {isOpen, onClose, id} = useOpenCategory();

  const categoryQuery = useGetCategory(id);

  const editMutation = useEditCategory(id);

  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name
  } : { name: "" }


  const onDelete = async () => {
    const ok = await confirm();

    if(ok){
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      })
    }
  }

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>
              Editar Categoría
            </SheetTitle>
            <SheetDescription>
              ¡Edita una categoría anterior!
            </SheetDescription>
          </SheetHeader>
          {
            isLoading ? (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Loader2 className='size-4 animate-spin'/>
              </div>
            ) : (
              <AccountForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} onDelete={onDelete} />
            )
          }
        </SheetContent>
      </Sheet>
    </>
  )
};