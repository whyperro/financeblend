'use client';

import { useGetSummary } from "@/features/summary/api/useGetTransactions";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {FaPiggyBank} from 'react-icons/fa';
import {FaArrowTrendUp, FaArrowTrendDown} from 'react-icons/fa6';
import DataCard, { DataCardLoading } from "./DataCard";

const DataGrid = () => {

  const {data, isLoading} = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const dataRangeLabel = formatDateRange({to, from});
  console.log(isLoading)
  
  if(isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard 
        title="Resumen"
        value={data?.remainingAmount}
        percentageChange = {data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dataRangeLabel}
      />
      <DataCard 
        title="Ingresos"
        value={data?.incomeAmount}
        percentageChange = {data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="succes"
        dateRange={dataRangeLabel}
      />
      <DataCard 
        title="Gastos"
        value={data?.expensesAmount}
        percentageChange = {data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={dataRangeLabel}
      />
    </div>
  )
}

export default DataGrid