'use client'

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useDeleteCategory } from '@/features/categories/api/useDeleteCategory';
import { useOpenCategory } from '@/features/categories/hooks/useOpenCategory';
import useConfirm from '@/hooks/useConfirm';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';


type Props = {
  id: string;
}

const Actions = ({id}: Props) => {
  
  const [ConfirmationDialog, confirm] = useConfirm(
    "¿Estás seguro?",
    "Vas a eliminar esta categoría."
  )
  
  const deleteMutation = useDeleteCategory(id);

  const {onOpen} = useOpenCategory();

  const handleDelete = async () => {

    const ok = await confirm();

    if(ok){
      deleteMutation.mutate()
    }
  }
  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='size-8 p-0'>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className='size-4 mr-2'/>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash2 className='size-4 mr-2'/>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Actions