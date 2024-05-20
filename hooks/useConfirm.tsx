import { useState } from "react"

import {
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";



export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {

  const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({resolve})
  });

  const handleClose = () => {
    setPromise(null);
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose();
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise!== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button onClick={handleClose} variant={"outline"}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm]

}


export default useConfirm