import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface RealmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export function RealmButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: RealmButtonProps) {
  const variantClasses =
    variant === 'primary'
      ? 'border border-[#CFA861] bg-[#392C20] text-[#E5D5B9] hover:bg-[#493828] hover:border-[#E3D2AD]'
      : variant === 'secondary'
        ? 'border border-[#B18A45]/55 bg-[#171411]/85 text-[#E5D5B9] hover:border-[#CFA861] hover:bg-[#241D17]'
        : 'border border-transparent bg-transparent text-[#E5D5B9]/85 hover:text-[#CFA861] hover:bg-[#392C20]/45'

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
