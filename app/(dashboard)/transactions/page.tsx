'use client'

import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { transactions as transactionSchema } from '@/db/schema'
import useSelectAccount from '@/features/accounts/hooks/useSelectAccount'
import { useBulkDeleteTransactions } from '@/features/transactions/api/useBulkDeleteTransactions'
import { useGetTransactions } from '@/features/transactions/api/useGetTransactions'
import { useNewTransaction } from '@/features/transactions/hooks/useNewTransaction'
import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { columns } from "./columns"
import UploadButton from './upload-button'
import ImportCard from './import-card'
import { toast } from 'sonner'
import { useBulkCreateTransactions } from '@/features/transactions/api/useBulkCreateTransactions'



enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
};

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
}

const TransactionsPage = () => {

  const [ConfirmationDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  }
  
  const newTransaction = useNewTransaction();
  const createTransactions = useBulkCreateTransactions();
  const transactionsQuery = useGetTransactions();
  const allTransactions = transactionsQuery.data || [];
  const deleteTransactions = useBulkDeleteTransactions();

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

  if(transactionsQuery.isPending) {
    return (
      <div className='max-w-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48'/>
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2 className='size-8 text-slate-300 animate-spin'/>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const onSubmitImport = async (values: typeof transactionSchema.$inferInsert[]) => {
    const accountId = await confirm();
    if(!accountId) {
      return toast.error("Por favor, seleccione una cuenta para continuar");
    }
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }))
    createTransactions.mutate(data,{
      onSuccess: () => {
        onCancelImport();
      }
    })
    
  }

  const onCancelImport = ( ) => {
    setVariant(VARIANTS.LIST)
    setImportResults(INITIAL_IMPORT_RESULTS);
  }

  if(variant === VARIANTS.IMPORT) {
    return (
      <>
        <ConfirmationDialog /> 
        <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={onSubmitImport} />
      </>
    )
  }
  
  return (
    <div className='max-w-5xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Historial de Transacciones
          </CardTitle>
          <div className='flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2'>
            <Button onClick={newTransaction.onOpen} size={'sm'}>
              <Plus size={20} className='mr-1' /> Nueva Transacción
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
           <DataTable disabled={isDisabled} onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteTransactions.mutate({ids})
           }} filteredKey='payee' columns={columns} data={allTransactions} />
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage