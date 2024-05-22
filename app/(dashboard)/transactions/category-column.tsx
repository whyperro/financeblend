import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";
import { TriangleAlert } from "lucide-react";


type Props = {
  id: string,
  category: string | null,
  categoryId: string | null,
}


export const CategoryColumn = ({
  id, category, categoryId
}: Props) => {

  const {onOpen: onOpenCategory} = useOpenCategory();
  const {onOpen: onOpenTransaction} = useOpenTransaction();

  const onClick = () => {
    if(categoryId){
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
      
  }

  return (
    <div onClick={onClick} className="flex items-center cursor-pointer hover:underline">
      {!category && <TriangleAlert className="size-4 mr-2 text-red-500 shrink-0" />}
      {category || "Sin categoría"}
    </div>
  )

}