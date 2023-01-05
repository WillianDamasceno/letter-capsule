import { LetterList } from "./LetterList"

const Page = () => {
  return (
    <section className="p-8 text-gray-300 mx-auto max-w-2xl">
      <div className="flex flex-col overflow-hidden rounded border-2 border-gray-700">
        <LetterList />
      </div>
    </section>
  )
}

export default Page
