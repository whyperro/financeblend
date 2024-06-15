'use client'

import { useGetSummary } from "@/features/summary/api/useGetTransactions";
import Chart from "./Chart";
import SpendingPie, { SpendingPieLoading } from "./SpendingPie";

const DataCharts = () => {
  const {data, isLoading} = useGetSummary();

  if(isLoading) {
    return (
      <SpendingPieLoading />
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 lg:col-span-2 ">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  )
}

export default DataCharts