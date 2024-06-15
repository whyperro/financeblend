'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";

const AccountFilter = () => {

  const {data: acounts, isLoading: isLoadingAccounts} = useGetAccounts()

  return (
    <Select
      value=""
      onValueChange={() => {}}
      disabled={false}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Cuenta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          Todas las cuentas
        </SelectItem>
        {acounts?.map((account) => (
          <SelectItem value={account.name} key={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AccountFilter