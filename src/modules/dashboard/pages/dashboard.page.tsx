import { Page } from "@/lib/components/shared/page";
import { ListTrans } from "@/modules/dashboard/components";
import { ButtonCreateTrans } from "@/modules/dashboard/components/create-trans.button";
import { TransactionFilter } from "@/modules/dashboard/components/transaction-filter/transaction-filter";

export const PageDashboard = () => {
  return (
    <Page
      title="Dashboard"
      headerProps={{ rightComponent: <ButtonCreateTrans /> }}
      descComponent={<TransactionFilter />}
    >
      <ListTrans />
    </Page>
  );
};
