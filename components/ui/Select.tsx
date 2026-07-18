'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:    string
  error?:    string
  hint?:     string
  options:   SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, options, placeholder, className, id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-[11px] font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 pl-4 pr-10 font-body text-base appearance-none cursor-pointer',
            'bg-[--color-surface-white] text-[--color-text-primary]',
            'border border-[--color-border-default] rounded-[--radius-sm]',
            'transition-colors',
            'focus:outline-none focus:border-[--color-border-accent]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error ? 'border-[--color-error-base]' : '',
            className
          )}
          style={{
            transitionDuration: 'var(--duration-normal)',
            transitionTimingFunction: 'var(--ease-architectural)',
          }}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-tertiary)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {error && (
        <p className="font-body text-[12px]" style={{ color: 'var(--color-error-base)' }} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="font-body text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
          {hint}
        </p>
      )}
    </div>
  )
})

export { Select }
export type { SelectProps, SelectOption }
