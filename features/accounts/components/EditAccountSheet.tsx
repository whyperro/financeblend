import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { insertAccountSchema } from '@/db/schema';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useEditAccount } from '../api/useEditAccount';
import { useDeleteAccount } from '../api/useDeleteAccount';
import { useGetAccount } from '../api/useGetAccount';
import { useOpenAccount } from '../hooks/useOpenAccount';
import { AccountForm } from './AccountForm';
import useConfirm from '@/hooks/useConfirm';

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {

  const [ConfirmationDialog, confirm] = useConfirm(
    "¿Estás seguro?",
    "Estás a punto de eliminar una cuenta."
  )

  const {isOpen, onClose, id} = useOpenAccount();

  const accountQuery = useGetAccount(id);

  const editMutation = useEditAccount(id);

  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
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
              Editar Cuenta
            </SheetTitle>
            <SheetDescription>
              ¡Edita una cuenta anterior!
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