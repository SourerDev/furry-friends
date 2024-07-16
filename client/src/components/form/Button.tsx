import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

const VARIANTS = [''] as const

type ButtonProps = {
  variant?: number
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({ children, variant, ...props }: ButtonProps) {
  const commonClass = ' h-10 px-5'

  return (
    <button
      className={
        'bg-slate-50 text-slate-500 font-semibold hover:bg-slate-100 active:bg-slate-200 disabled:text-slate-300 disabled:hover:bg-slate-50 disabled:active:bg-slate-50' +
        commonClass
      }
      {...props}
    >
      {children}
    </button>
  )
}
