'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useState } from 'react';
import ImportTable from './import-table';
import { convertAmountToMiliunits } from '@/lib/utils';
import { format, parse } from 'date-fns';


const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd';

const requiredOptions = [
  "amount",
  "date",
  "payee",
]

interface SelectedColumnState {
  [key: string]: string | null;
}

type Props = { 
  data: string[][];
  onCancel: () => void,
  onSubmit: (data: any) => void;
}

const ImportCard = ({data, onCancel, onSubmit}: Props) => {

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({})

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (columnIndex: number, value: string|null) => {

    setSelectedColumns((prev) => {
      const newSelectedColumns = {...prev}
      for(const key in newSelectedColumns) {
        if(newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }
      if(value === 'skip') {
        value = null;
      }
      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    })

  }

  const progress = Object.values(selectedColumns).filter(Boolean).length;


  const handleContinue = () => {

    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    }

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`)

        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body.map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`)
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          })

          return transformedRow.every((item) => item === null) ? [] : transformedRow;
      }).filter((row) => row.length > 0)
    }



    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index]
        if(header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {})
    })

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat)
    }))

    onSubmit(formattedData)
  }

  return (
    <div className='max-w-5xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Importar Transaccion
          </CardTitle>
          <div className='flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2'>
            <Button onClick={onCancel} size={'sm'}>
              Cancelar
            </Button>
            <Button disabled={progress < requiredOptions.length} onClick={handleContinue} size={'sm'}>
              Continuar ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable body={body} headers={headers} selectedColumns={selectedColumns} onTableHeadSelectChange={onTableHeadSelectChange} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ImportCard;