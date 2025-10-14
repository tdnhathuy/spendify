import { Page } from "@/lib/components/shared/page";
import { HeaderDashboard, ListTrans } from "@/modules/dashboard/components";
import { ButtonCreateTrans } from "@/modules/dashboard/components/create-trans.button";

export const PageDashboard = () => {
  return (
    <Page
      title="Dashboard"
      headerProps={{ rightComponent: <ButtonCreateTrans /> }}
    >
      {/* <HeaderDashboard /> */}
      <ListTrans />
    </Page>
  );
};
