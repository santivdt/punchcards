type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex items-center border-b py-4">
      <div className="flex-1 flex items-center">
        <h2 className="font-bold flex-1 text-lg h-10 flex items-center">
          {title}
        </h2>
      </div>
      {children && <div>{children}</div>}
    </header>
  );
}
