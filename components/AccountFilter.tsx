'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useGetSummary } from "@/features/summary/api/useGetTransactions";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string"

const AccountFilter = () => {
  
  const {data: acounts, isLoading: isLoadingAccounts} = useGetAccounts()

  const router = useRouter()

  const params = useSearchParams();

  const pathname = usePathname();

  const accountId = params.get("accountId") || "all";

  const from = params.get("from") || ""
  const to = params.get("to") || ""

  const {
    isLoading: isLoadingSummary
  } = useGetSummary()

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to
    }

    if(newValue === 'all') { 
      query.accountId = '';
    }

    const url = qs.stringifyUrl({
      url: pathname,
      query,

    }, {skipNull: true, skipEmptyString: true})

    router.push(url);
  } 

  

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Cuenta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          Todas las cuentas
        </SelectItem>
        {acounts?.map((account) => (
          <SelectItem value={account.id} key={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AccountFilter