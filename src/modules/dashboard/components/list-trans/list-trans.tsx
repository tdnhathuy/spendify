"use client";

import { useQueryTrans } from "@/lib/api/app.query";
import { openDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ListTransGroup } from "@/modules/dashboard/components/list-trans/list-trans-group";
import dayjs from "dayjs";
import { groupBy, map } from "lodash";

export const ListTrans = () => {
  const { data = [] } = useQueryTrans();
  const grouped = groupBy(data, (item) =>
    dayjs(item.date).format("DD/MM/YYYY")
  );

  return (
    <div className="flex gap-2 flex-col   w-full">
      <span className="flex justify-between w-full items-center">
        <h1 className="font-semibold text-xl">List Transaction</h1>
        <WiseButton
          onClick={() => {
            openDialog("trans", null);
          }}
          size={"sm"}
        >
          Add Transaction 2
        </WiseButton>
      </span>

      <ul className="flex flex-col gap-2 mx-auto bg-white p-4 rounded-sm border">
        {map(grouped, (item, key) => {
          return <ListTransGroup key={key} data={item} date={key} />;
        })}
      </ul>
    </div>
  );
};
