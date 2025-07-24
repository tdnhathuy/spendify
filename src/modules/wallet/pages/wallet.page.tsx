"use client";

import { client, MutationKeys, QueryKeys } from "@/lib/configs";
import { ServiceWallet } from "@/lib/services";
import { WrapperWallet } from "@/modules/wallet/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export const PageWallet = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.getWallet],
    queryFn: ServiceWallet.getWallet,
  });

  const mutation = useMutation({
    mutationKey: [MutationKeys.createWallet],
    mutationFn: (data: any) => {
      return client.post("/api/wallet", data);
    },
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <h1>Wallet2</h1>

      <div className="grid grid-cols-5 gap-2  w-full">
        <WrapperWallet
          className="flex justify-center items-center"
          onClick={() => {
            console.log("clicked");
            mutation.mutateAsync({});
          }}
        >
          <span className="text-center gap-2 flex items-center justify-center flex-col text-sm ">
            <Plus />
            <span>Add Wallet</span>
          </span>
        </WrapperWallet>
      </div>
    </div>
  );
};
