import { finishOrder } from "@/actions/finish-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getUseCartQueryKey } from "../queries/use-cart"

export const getUseFinishOrderMutationKey = () => ['finish-order'];


const useFinishOrder = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
        await finishOrder()
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: getUseCartQueryKey()})
    },
  });
};

export default useFinishOrder