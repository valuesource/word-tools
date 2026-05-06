export const metadata = {
  title: 'Word Tools',
  description: 'Word unscrambler and word finder tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}