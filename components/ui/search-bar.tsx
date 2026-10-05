'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  size?: 'md' | 'lg';
}

/** O tim kiem toan site — Enter dan toi /tim-kiem?q=... */
export function SearchBar({
  placeholder = 'Tìm công cụ, vật liệu, ký hiệu… (Ctrl+K)',
  defaultValue = '',
  size = 'md',
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/tim-kiem?q=${encodeURIComponent(q)}` : '/tim-kiem');
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`relative w-full ${size === 'lg' ? 'max-w-2xl' : 'max-w-xl'}`}
    >
      <label htmlFor="site-search" className="sr-only">
        Tìm kiếm toàn site
      </label>
      <Search
        size={size === 'lg' ? 20 : 16}
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`input-base pl-10 ${size === 'lg' ? '!py-3.5 text-base' : ''}`}
      />
      <kbd
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-badge border px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block"
        style={{ borderColor: 'var(--border-default)' }}
      >
        Ctrl K
      </kbd>
    </form>
  );
}
