import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <button
              onClick={() => navigate(item.href!)}
              className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
