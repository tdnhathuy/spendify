export interface WiseInputLabelProps {
  label: string;
}
export const WiseInputLabel = (props: Partial<WiseInputLabelProps>) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-base font-semibold text-white">
        {props.label}
      </label>
    </div>
  );
};
