import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { insertTransactionSchema } from '@/db/schema';
import { z } from 'zod';
import { useCreateTransaction } from '../api/useCreateTransaction';
import { useNewTransaction } from '../hooks/useNewTransaction';
import { useGetCategories } from '@/features/categories/api/useGetCategories';
import { useCreateCategory } from '@/features/categories/api/useCreateCategory';
import { useGetAccounts } from '@/features/accounts/api/useGetAccounts';
import { useCreateAccount } from '@/features/accounts/api/useCreateAccount';
import { TransactionForm } from './TransactionForm';
import { Loader2 } from 'lucide-react';

const formSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {

  const {isOpen, onClose} = useNewTransaction();

  const createMutation = useCreateTransaction();
  
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

  const isPending = createMutation.isPending || accountsMutation.isPending || categoryMutation.isPending

  const isLoading = accountsQuery.isLoading || categoryQuery.isLoading

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
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
            Nueva Transacción
          </SheetTitle>
          <SheetDescription>
            ¡Crea una transacción para añadirla al registro!
          </SheetDescription>
        </SheetHeader>
        {
          isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-6 animate-spin' />
            </div>
          ) : (
            <TransactionForm onSubmit={onSubmit} disabled={isPending} categoryOptions={categoryOptions} onCategoryCreate={onCategoryCreate} accountOptions={accountsOptions} onAccountCreate={onAccountCreate}/>
          )
        }
      </SheetContent>
    </Sheet>
  )
};