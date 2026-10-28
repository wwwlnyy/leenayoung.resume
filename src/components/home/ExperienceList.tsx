import type { Experience } from "@content/types";

interface ExperienceListProps {
  items: readonly Experience[];
}

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-sub tabular-nums">{item.period}</p>
          </div>
          <p className="text-sm text-sub">{item.role}</p>
          {item.description && <p className="mt-1">{item.description}</p>}
        </li>
      ))}
    </ul>
  );
}
