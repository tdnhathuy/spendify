import { queryClient, QueryKeys } from "@/lib/configs";
import { ITransaction } from "@/lib/types";

export const QueryStore = {
    updateTrans: (trans: ITransaction) => {
        queryClient.setQueryData([QueryKeys.getTrans], trans);
    },
};
