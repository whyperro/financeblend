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
import { useBulkDeleteCategories } from '@/features/categories/api/useBulkDeleteCategorie'
import { useGetCategories } from '@/features/categories/api/useGetCategories'
import { useNewCategory } from '@/features/categories/hooks/useNewCategory'
import { Loader2, Plus } from 'lucide-react'
import { columns } from "./columns"



const AccountsPage = () => {

  const newCategory = useNewCategory();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];
  const deleteCategories = useBulkDeleteCategories();

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if(categoriesQuery.isPending) {
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
            Categorías
          </CardTitle>
          <Button onClick={newCategory.onOpen} size={'sm'}>
            <Plus size={20} className='mr-2'/> Nueva Categoría
          </Button>
        </CardHeader>
        <CardContent>
           <DataTable disabled={isDisabled} onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteCategories.mutate({ids})
           }} filteredKey='name' columns={columns} data={categories} />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage