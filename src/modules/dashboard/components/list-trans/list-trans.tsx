"use client";

import { useMutateCreateTrans } from "@/lib/api/app.mutate";
import { useQueryTrans } from "@/lib/api/app.query";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ListTransItem } from "@/modules/dashboard/components/list-trans/list-trans-item";
import { groupBy, map } from "lodash";
import dayjs from "dayjs";
import { openDialog } from "@/lib/components/dialogs/dialog.store";

export const ListTrans = () => {
  const { data = [] } = useQueryTrans();
  console.log("data", data);
  const grouped = groupBy(data, (item) =>
    dayjs(item.date).format("DD/MM/YYYY")
  );

  const { mutateAsync: create } = useMutateCreateTrans();
  return (
    <div className="flex gap-2 flex-col   w-full">
      <span className="flex justify-between w-full items-center">
        <h1 className="font-semibold text-xl">List Transaction</h1>
        <WiseButton
          onClick={() => {
            openDialog("trans", null);
            console.log("1", 1);
            return;
            create({
              amount: "1000",
              date: new Date(),
              desc: "test",
              idWallet: null,
              idCategory: null,
            });
          }}
          size={"sm"}
        >
          Add Transaction 2
        </WiseButton>
      </span>

      <ul className="flex flex-col gap-2 mx-auto bg-white p-4 rounded-sm border">
        {map(grouped, (item, key) => (
          <li key={key}>
            <span className="flex justify-between items-center bg-[#f5f5f6] w-full px-2 py-1 rounded-sm mb-2">
              {key}
            </span>

            <ul className=" gap-1 flex flex-col">
              {item.map((item) => (
                <ListTransItem key={item.id} item={item} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
