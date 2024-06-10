import { useRef, useState } from "react"

import {
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "../api/useGetAccounts";
import { useCreateAccount } from "../api/useCreateAccount";
import Select from "@/components/Select";



export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
  console.log('eya')
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  })

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))

  const [promise, setPromise] = useState<{resolve: (value: string | undefined) => void} | null>(null);

  const selectValue = useRef<string>();

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve})
  });

  const handleClose = () => {
    setPromise(null);
  }

  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose();
  }

  const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose();
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise!== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Seleccione Cuenta
          </DialogTitle>
          <DialogDescription>
            Debe seleccionar una cuenta para continuar.
          </DialogDescription>
        </DialogHeader>
        <Select options={accountOptions} disabled={accountQuery.isLoading || accountMutation.isPending} onCreate={onCreateAccount} placeholder="Cuenta a elegir" onChange={(value) => selectValue.current = value} />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant={"outline"}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm]

}


export default useSelectAccount