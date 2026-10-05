import type { ReactNode } from 'react';

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
}

/** Container card toi vien subtle — khoi noi dung chuan toan site. */
export function SectionCard({ title, description, action, children, id }: SectionCardProps) {
  return (
    <section
      id={id}
      className="card rounded-card p-5 sm:p-6"
      aria-labelledby={title && id ? `${id}-title` : undefined}
    >
      {title || action ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? (
              <h2 id={id ? `${id}-title` : undefined} className="text-[1.125rem] font-semibold text-primary">
                {title}
              </h2>
            ) : null}
            {description ? <p className="mt-1 text-sm text-secondary">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}
