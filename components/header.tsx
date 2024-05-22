type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex items-center">
      <h2 className="flex-1">{title}</h2>
      {children && <div>{children}</div>}
    </header>
  );
}
