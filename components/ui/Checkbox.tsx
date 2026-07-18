'use client'

import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils/cn'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label:      string
  hint?:      string
  error?:     string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, className, id, ...props },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={inputId}
        className="flex items-start gap-3 cursor-pointer select-none"
      >
        <span className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer sr-only"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {/* Custom box */}
          <span
            className={cn(
              'flex items-center justify-center w-5 h-5 transition-colors',
              'border rounded-[--radius-xs]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[--color-border-accent] peer-focus-visible:ring-offset-1',
              error
                ? 'border-[--color-error-base]'
                : 'border-[--color-border-default] peer-checked:border-[--color-primary-base] peer-checked:bg-[--color-primary-base]',
              'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
            )}
            style={{ transitionDuration: 'var(--duration-fast)', transitionTimingFunction: 'var(--ease-architectural)' }}
            aria-hidden="true"
          >
            {/* Checkmark — always rendered; opacity controlled by peer-checked */}
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              className="opacity-0 peer-checked:opacity-100 transition-opacity"
              style={{ transitionDuration: 'var(--duration-fast)' }}
              aria-hidden="true"
            >
              <path
                d="M1 4l3 3 5-6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>

        <span
          className="font-body text-sm leading-snug"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {label}
        </span>
      </label>

      {error && (
        <p
          id={`${inputId}-error`}
          className="font-body text-[12px] pl-8"
          style={{ color: 'var(--color-error-base)' }}
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p
          id={`${inputId}-hint`}
          className="font-body text-[12px] pl-8"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {hint}
        </p>
      )}
    </div>
  )
})

export { Checkbox }
export type { CheckboxProps }
