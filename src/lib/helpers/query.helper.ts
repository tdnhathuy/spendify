import { QueryKeys } from "@/lib/configs";
import { queryClient } from "@/lib/configs";
import { ITransaction, ResponsePagination } from "@/lib/types";
import { InfiniteData } from "@tanstack/react-query";
import { produce } from "immer";

export const updateQueryTransaction = (trans: ITransaction) => {
  queryClient.setQueryData(
    [QueryKeys.infiniteTrans],
    (old: InfiniteData<ResponsePagination<ITransaction[]>>) => {
      return produce(old, (draft) => {
        for (const page of draft.pages) {
          const index = page.data.findIndex((x) => x.id === trans.id);
          if (index !== -1) {
            page.data[index] = trans;
            break;
          }
        }
      });
    }
  );
};

export const deleteQueryTransaction = (id: string) => {
  queryClient.setQueryData(
    [QueryKeys.infiniteTrans],
    (old: InfiniteData<ResponsePagination<ITransaction[]>>) => {
      return produce(old, (draft) => {
        for (const page of draft.pages) {
          const index = page.data.findIndex((x) => x.id === id);
          if (index !== -1) {
            page.data.splice(index, 1);
            break;
          }
        }
      });
    }
  );
};
