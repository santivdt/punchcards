type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex items-center border-b py-4">
      <div className="h-10 flex-1 flex items-center">
        <h2 className="flex-1">{title}</h2>
      </div>
      {children && <div>{children}</div>}
    </header>
  );
}
