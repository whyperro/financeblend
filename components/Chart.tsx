import { AreaChart, BarChart, FileSearch, LineChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Card, CardContent, CardDescription, CardHeader,CardTitle } from "./ui/card";
import AreaVariant from "./AreaVariant";
import BarVariant from "./BarVariant";
import LineVariant from "./LineVariant";
import { useState } from "react";

type Props = {
  data?: {
    date: string,
    income: number,
    expenses: number,
  }[]
}

const Chart = ({data = []}: Props) => {
  const [chartType, setChartType] = useState("area");

  const onTypeChange = (type: string) => {
    setChartType(type);
  }

  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Transacciones
        </CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Tipo de gráfico"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p>Grafica de Areas</p> 
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p>Grafica de Barras</p> 
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p>Grafica de Lineas</p> 
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-cl gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground"/>
            <p>No se ha encontrado información de este periodo...</p>
          </div>
        ) : (
          <>
            {chartType === 'area' && <AreaVariant data={data} />}
            {chartType === 'line' && <LineVariant data={data} />}
            {chartType === 'bar' && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Chart