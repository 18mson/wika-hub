import { Zap } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 safe-area-top">
      <div className="max-w-lg mx-auto flex items-center gap-2">
        <Zap size={28} fill="white" />
        <div>
          <h1 className="text-2xl font-bold">Wika-hub</h1>
          <p className="text-xs text-blue-100">{title}</p>
        </div>
      </div>
    </header>
  );
}
