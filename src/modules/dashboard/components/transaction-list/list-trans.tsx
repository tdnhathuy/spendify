"use client";

import { usePaging } from "@/hooks/use-paging";
import { LoaderPaging } from "@/lib/components/shared/loader-paging";
import { QueryKeys } from "@/lib/configs";
import { ServiceTrans } from "@/lib/services";
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

  const grouped = groupBy(data, (item) =>
    dayjs(item.date).format("DD/MM/YYYY")
  );

  if (isFirstLoading) return <Loader className="animate-spin" />;

  return (
    <div className="flex gap-2 flex-col ">
      <ul className="flex flex-col gap-4 mx-auto  w-full">
        {map(grouped, (item, key) => {
          return <ListTransGroup key={key} data={item} date={key} />;
        })}
        <LoaderPaging {...loaderProps} />
      </ul>
    </div>
  );
};
