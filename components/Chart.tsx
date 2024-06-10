import { FileSearch } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader,CardTitle } from "./ui/card";
import AreaVariant from "./AreaVariant";

type Props = {
  data?: {
    date: string,
    income: number,
    expenses: number,
  }[]
}

const Chart = ({data = []}: Props) => {
  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Transacciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-cl gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground"/>
            <p>No se ha encontrado información de este periodo...</p>
          </div>
        ) : (
          <AreaVariant data={data} />
        )}
      </CardContent>
    </Card>
  )
}

export default Chart