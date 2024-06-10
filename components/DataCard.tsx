import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import {VariantProps, cva} from 'class-variance-authority';
import { IconType } from "react-icons/lib";
import { Card, CardContent, CardDescription, CardHeader,CardTitle } from "./ui/card";
import { CountUp } from "./CountUp";
import { Skeleton } from "./ui/skeleton";


const boxVariants = cva(
  "rounded-md p-3",
  {
    variants: {
      variant: {
        default: "bg-blue-500/20",
        succes: "bg-emerald-500/20",
        danger: "bg-rose-500/20",
        warning: "bg-yellow-500/20",
      }
    },
    defaultVariants:{
      variant: "default"
    }
  }
)

const iconVariants = cva(
  "size-6",
  {
    variants: {
      variant: {
        default: "fill-blue-500",
        succes: "fill-emerald-500",
        danger: "fill-rose-500",
        warning: "fill-yellow-500",
      }
    },
    defaultVariants:{
      variant: "default"
    }
  }
)

type BoxVariants = VariantProps<typeof boxVariants>
type IconVariants = VariantProps<typeof iconVariants>

interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType,
  title: string,
  value?: number,
  dateRange: string,
  percentageChange?: number,
}


const DataCard = ({icon: Icon, title, value = 0, dateRange, percentageChange = 0, variant}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn("shrink-0", boxVariants({variant}))}>
          <Icon className={cn(iconVariants({variant}))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp preserveValue start={0} end={value} decimal="2" decimalPlaces={2} formattingFn={formatCurrency}/>
        </h1>
        <p className={cn("text-muted-foreground text-sm line-clamp-1", percentageChange > 0 && "text-emerald-500", percentageChange < 0 && "text-rose-500s")}>
          {formatPercentage(percentageChange, {addPrefix: true})} desde su último periodo.
        </p>
      </CardContent>
    </Card>
  )
}

export const DataCardLoading = () => {
  return (
    <Card className="border-none drop-shadow-md h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="size-21" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shrink-0 h-10 w-24 mb-2"/>
        <Skeleton className="shrink-0 h-10 w-40"/>
      </CardContent>
    </Card>
  )
}

export default DataCard

