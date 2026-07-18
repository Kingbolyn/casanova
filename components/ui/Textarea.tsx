'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?:  string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, className, id, ...props },
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

      <textarea
        ref={ref}
        id={inputId}
        className={cn(
          'w-full min-h-[120px] px-4 py-3 font-body text-base resize-y',
          'bg-[--color-surface-white] text-[--color-text-primary]',
          'border border-[--color-border-default] rounded-[--radius-sm]',
          'placeholder:text-[--color-text-disabled]',
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
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className="font-body text-[12px]" style={{ color: 'var(--color-error-base)' }} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="font-body text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
          {hint}
        </p>
      )}
    </div>
  )
})

export { Textarea }
export type { TextareaProps }
