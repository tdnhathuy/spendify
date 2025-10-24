import { CategoryType } from "@/generated/prisma";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const ModeSelection = (props: {
  mode: CategoryType;
  setMode: (mode: CategoryType) => void;
}) => {
  const { mode, setMode } = props;

  return (
    <div className="flex gap-2 ">
      {[CategoryType.Spend, CategoryType.Income].map((type) => {
        return (
          <WiseButton
            key={type}
            size={"sm"}
            variant={mode === type ? "default" : "outline"}
            onClick={() => setMode(type)}
            className="flex flex-1"
          >
            {type}
          </WiseButton>
        );
      })}
    </div>
  );
};
