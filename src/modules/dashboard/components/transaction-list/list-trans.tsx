"use client";

import { usePaging } from "@/hooks/use-paging";
import { useQueryWallet } from "@/lib/api/app.query";
import { LoaderPaging } from "@/lib/components/shared/loader-paging";
import { QueryKeys } from "@/lib/configs";
import { ServiceTrans } from "@/lib/services";
import { TransactionFilter } from "@/modules/dashboard/components/transaction-filter/transaction-filter";
import { ListTransGroup } from "@/modules/dashboard/components/transaction-list/list-trans-group";
import dayjs from "dayjs";
import { groupBy, map } from "lodash";
import { Loader } from "lucide-react";

export const ListTrans = () => {
  const {
    listData: data,
    loaderProps,
    isFirstLoading,
  } = usePaging({
    key: QueryKeys.infiniteTrans,
    service: ServiceTrans.get,
  });

  const { data: wallets = [] } = useQueryWallet();

  const grouped = groupBy(data, (item) =>
    dayjs(item.date).format("DD/MM/YYYY")
  );

  if (isFirstLoading) return <Loader className="animate-spin" />;

  return (
    <div className="flex gap-2 flex-col ">
      <TransactionFilter />
      <ul className="flex flex-col gap-4 mx-auto  w-full overflow-y-hidden">
        {map(grouped, (item, key) => {
          return <ListTransGroup key={key} data={item} date={key} />;
        })}
        <LoaderPaging {...loaderProps} />
      </ul>
    </div>
  );
};
