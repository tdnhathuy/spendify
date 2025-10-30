import { Page } from "@/lib/components/shared/page";
import { ListTrans } from "@/modules/dashboard/components";
import { HeaderRight } from "@/modules/dashboard/components/header-right";
import { TransactionFilterResult } from "@/modules/dashboard/components/transaction-filter/transaction-filter-result";

export const PageDashboard = () => {
  return (
    <Page
      title="Dashboard"
      headerProps={{ rightComponent: <HeaderRight /> }}
      descComponent={<TransactionFilterResult />}
    >
      <ListTrans />
    </Page>
  );
};
