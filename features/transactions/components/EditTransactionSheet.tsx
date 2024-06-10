import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { insertTransactionSchema } from '@/db/schema';
import useConfirm from '@/hooks/useConfirm';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useDeleteTransaction } from '../api/useDeleteTransaction';
import { useEditTransaction } from '../api/useEditTransaction';
import { useGetTransaction } from '../api/useGetTransaction';
import { useOpenTransaction } from '../hooks/useOpenTransaction';
import { TransactionForm } from './TransactionForm';
import { useGetAccounts } from '@/features/accounts/api/useGetAccounts';
import { useGetCategories } from '@/features/categories/api/useGetCategories';
import { useCreateCategory } from '@/features/categories/api/useCreateCategory';
import { useCreateAccount } from '@/features/accounts/api/useCreateAccount';
import { convertAmountFromMiliunits } from '@/lib/utils';

const formSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {

  const [ConfirmationDialog, confirm] = useConfirm(
    "¿Estás seguro?",
    "Estás a punto de eliminar esta transacción."
  )

  const {isOpen, onClose, id} = useOpenTransaction();

  const transactionQuery = useGetTransaction(id);

  const editMutation = useEditTransaction(id);

  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();

  const categoryMutation = useCreateCategory();

  const onCategoryCreate = (name: string) => categoryMutation.mutate({
    name
  })

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id
  }))

  const accountsQuery = useGetAccounts();

  const accountsMutation = useCreateAccount();

  const onAccountCreate = (name: string) => accountsMutation.mutate({
    name
  })

  const accountsOptions = (accountsQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id
  }))

  const isPending = editMutation.isPending || deleteMutation.isPending || accountsMutation.isPending || categoryMutation.isPending;

  const isLoading = transactionQuery.isLoading || accountsQuery.isLoading || categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }
  
  

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: convertAmountFromMiliunits(transactionQuery.data?.amount).toString(),
    date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes,
  } : { 
    accountId: "",
    categoryId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: "",
   }


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
              Editar Transacción
            </SheetTitle>
            <SheetDescription>
              ¡Edita una transacción anterior!
            </SheetDescription>
          </SheetHeader>
          {
            isLoading ? (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Loader2 className='size-4 animate-spin'/>
              </div>
            ) : (
              <TransactionForm id={id} defaultValues={defaultValues} onSubmit={onSubmit} disabled={isPending} categoryOptions={categoryOptions} onCategoryCreate={onCategoryCreate} accountOptions={accountsOptions} onAccountCreate={onAccountCreate} onDelete={onDelete}/>
            )
          }
        </SheetContent>
      </Sheet>
    </>
  )
};