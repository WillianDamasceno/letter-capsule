import { SignOutButton } from "./SignOutButton"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section>
        <SignOutButton />
      </section>

      {children}
    </main>
  )
}

export default Layout
