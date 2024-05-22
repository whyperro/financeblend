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
import { useBulkDeleteTransactions } from '@/features/transactions/api/useBulkDeleteTransactions'
import { useGetTransactions } from '@/features/transactions/api/useGetTransactions'
import { useNewTransaction } from '@/features/transactions/hooks/useNewTransaction'
import { Loader2, Plus } from 'lucide-react'
import { columns } from "./columns"



const TransactionsPage = () => {

  const newTransaction = useNewTransaction();
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
  
  return (
    <div className='max-w-5xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Historial de Transacciones
          </CardTitle>
          <Button onClick={newTransaction.onOpen} size={'sm'}>
            <Plus size={20} className='mr-1' /> Nueva Transacción
          </Button>
        </CardHeader>
        <CardContent>
           <DataTable disabled={isDisabled} onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteTransactions.mutate({ids})
           }} filteredKey='category' columns={columns} data={allTransactions} />
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage