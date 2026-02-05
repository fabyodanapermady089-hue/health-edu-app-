export const metadata = {
  title: 'Health Edu App',
  description: 'Aplikasi Edukasi Kesehatan Reproduksi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
