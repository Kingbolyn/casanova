'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:    string
  error?:    string
  hint?:     string
  icon?:     React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, icon, className, id, ...props },
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
        {icon && (
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 font-body text-base',
            'bg-[--color-surface-white] text-[--color-text-primary]',
            'border border-[--color-border-default] rounded-[--radius-sm]',
            'placeholder:text-[--color-text-disabled]',
            'transition-colors',
            'focus:outline-none focus:border-[--color-border-accent]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error ? 'border-[--color-error-base]' : '',
            icon ? 'pl-11 pr-4' : 'px-4',
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
      </div>

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

export { Input }
export type { InputProps }
