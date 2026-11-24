import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useRealm } from '../../context/realmContextCore'

interface ManuscriptCardProps {
  eyebrow?: string
  title?: string
  badge?: ReactNode
  children: ReactNode
  className?: string
}

export function ManuscriptCard({
  eyebrow,
  title,
  badge,
  children,
  className = '',
}: ManuscriptCardProps) {
  const { reducedMotion } = useRealm()

  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.28, ease: 'easeOut' }}
      className={`surface-parchment rounded-md p-5 sm:p-6 ${className}`}
    >
      {(eyebrow || title || badge) && (
        <header className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-[#524234]/20 pb-3">
          <div>
            {eyebrow && (
              <p className="font-display text-[11px] font-semibold tracking-[0.16em] uppercase text-[#741F20]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="mt-0.5 font-display text-lg font-bold text-[#241B14] sm:text-xl">
                {title}
              </h3>
            )}
          </div>
          {badge}
        </header>
      )}
      {children}
    </motion.section>
  )
}
