import { LetterList } from "./LetterList"

const Page = () => {
  return (
    <section className="mx-auto max-w-2xl p-8 text-gray-300">
      <div className="flex flex-col overflow-hidden rounded border-2 border-gray-700">
        <LetterList />
      </div>
    </section>
  )
}

export default Page
