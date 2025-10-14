export interface PageHeaderProps {
  title: string;
  description?: string;

  rightComponent?: React.ReactNode;
}
export const PageHeader = ({
  title,
  description,
  rightComponent,
}: PageHeaderProps) => {
  return (
    <header className="flex justify-between text-white">
      <span>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </span>

      {rightComponent}
    </header>
  );
};
