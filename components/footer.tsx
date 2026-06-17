export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8">
          {[
            { label: "GitHub", href: "https://github.com/heyhaiden" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/haidenmcgill/" },
            { label: "Devpost", href: "https://devpost.com/heyhaiden" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
