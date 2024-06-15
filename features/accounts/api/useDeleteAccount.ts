import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from "hono";

import { client } from '@/lib/hono';
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;


export const useDeleteAccount = (id?: string) => {

  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: {id},
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("¡Cuenta eliminada!")
      queryClient.invalidateQueries({queryKey: ["account", {id}]})
      queryClient.invalidateQueries({queryKey: ["accounts"]})
      queryClient.invalidateQueries({queryKey: ["summary"]})
    },
    onError: () => {
      toast.error("Oops... no se pudo eliminar la cuenta.")
    }
  })

  return mutation;
}



