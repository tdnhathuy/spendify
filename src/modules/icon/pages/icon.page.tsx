"use client";

import { useQueryIcon } from "@/lib/api/app.query";
import { dialogs, IconPicker, PageHeader, WiseButton } from "@/lib/components";
import { Page } from "@/lib/components/shared/page";

export const PageIcon = () => {
  const { data: icons = [] } = useQueryIcon();

  return (
    <Page
      title={
        <PageHeader
          title="Icon"
          rightComponent={
            <WiseButton
              size="sm"
              variant="outline"
              onClick={() => {
                dialogs.open("create-icon");
              }}
            >
              Add
            </WiseButton>
          }
        />
      }
    >
      <div className="grid grid-cols-8 gap-6 md:grid-cols-10 lg:grid-cols-12">
        {icons.map((icon) => {
          return <IconPicker key={icon.id} icon={icon} disabled />;
        })}
      </div>
    </Page>
  );
};
