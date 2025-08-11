interface SectionTitleProps {
  title: string
  subtitle?: string
  dark?: boolean
  className?: string
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  dark = false, 
  className = '' 
}: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
        dark ? 'text-white' : 'text-slate-800'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${
          dark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}