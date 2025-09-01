import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      toast.success("Cabin edited successfully ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCabin };
}
