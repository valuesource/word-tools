import Link from 'next/link'

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 20, fontSize: 14 }}>
      <Link href="/">Home</Link>
      {items.map((item) => (
        <span key={item.href}>
          {' / '}
          <Link href={item.href}>{item.label}</Link>
        </span>
      ))}
    </nav>
  )
}