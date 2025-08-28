interface PageHeaderProps {
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
    <header className="flex justify-between">
      <span>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </span>

      {rightComponent}
    </header>
  );
};
