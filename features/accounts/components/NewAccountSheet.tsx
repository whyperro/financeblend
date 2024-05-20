import { useNewAccount } from '../hooks/useNewAccount';
import { insertAccountSchema } from '@/db/schema';
import { z } from 'zod';
import {
  Sheet, 
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { AccountForm } from './AccountForm';
import { useCreateAccount } from '../api/useCreateAccount';

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {

  const {isOpen, onClose} = useNewAccount();

  const mutation = useCreateAccount();

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
            Nueva Cuenta
          </SheetTitle>
          <SheetDescription>
            ¡Crea una cuenta para llevar tus transacciones!
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name: ""}}/>
      </SheetContent>
    </Sheet>
  )
};