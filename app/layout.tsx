import "../styles/globals.css"

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
