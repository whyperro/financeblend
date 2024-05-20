'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/useNewAccount'
import { columns } from "./columns"
import { DataTable } from '@/components/DataTable'
import { useGetAccounts } from '@/features/accounts/api/useGetAccounts'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import { useBulkDeleteAccounts } from '@/features/accounts/api/useBulkDelete'



const AccountsPage = () => {
  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];
  const deleteAccounts = useBulkDeleteAccounts();

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if(accountsQuery.isPending) {
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
    <div className='max-w-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Cuentas
          </CardTitle>
          <Button onClick={newAccount.onOpen} size={'sm'}>
            Agregar Cuenta
          </Button>
        </CardHeader>
        <CardContent>
           <DataTable disabled={isDisabled} onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteAccounts.mutate({ids})
           }} filteredKey='name' columns={columns} data={accounts} />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage