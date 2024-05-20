'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/useNewAccount'
import { Payment, columns } from "./columns"
import { DataTable } from '@/components/DataTable'

const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed123152f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed3123152f",
      amount: 100,
      status: "pending",
      email: "f@example.com",
    },
  ]

const AccountsPage = () => {
  const newAccount = useNewAccount();
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
           <DataTable onDelete={() => {}} filteredKey='email' columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage