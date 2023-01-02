import { Menu } from "./Menu"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen grid-cols-4 bg-gray-600">
      <header className="w-full md:max-w-[15rem] min-w-fit bg-zinc-800">
        <Menu />
      </header>

      <main className="w-full">{children}</main>
    </div>
  )
}

export default Layout
