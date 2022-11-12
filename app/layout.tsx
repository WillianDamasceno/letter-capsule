import "../styles/globals.css";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: `alice${String(Math.random()).slice(3, 8)}@prisma.io`
  //   },
  // })
  // const allUsers = await prisma.user.findMany();
  // console.dir(allUsers, { depth: null })

  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
