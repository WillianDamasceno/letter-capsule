import { useEffect, useId } from "react"
import {
  LinkIcon,
  CodeBracketIcon,
  PhotoIcon,
  ListBulletIcon,
  QueueListIcon,
  CodeBracketSquareIcon,
  FilmIcon,
  PencilIcon,
  TableCellsIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import { BlockquoteIcon,  } from "../components/Icons"

const onInput = (e: any) => {
  console.log("This evento was not implemented yet")
}

const initRichText = (id: string) => {
  const richTextId = `${id}-rich-text`
  const richText = document.getElementById(richTextId)
  
  richText?.addEventListener("input", onInput)
}

const closeRichText = (id: string) => {
  const richTextId = `${id}-rich-text`
  const richText = document.getElementById(richTextId)

  richText?.removeEventListener("input", onInput)
}

type TextareaProps = {
  initialContent?: string
}

const Textarea = ({ initialContent = "" }: TextareaProps) => {
  const id = useId()
  
  useEffect(() => {
    initRichText(id)

    return () => closeRichText(id)
  }, [])

  return (
    <>
      <div
        id={`${id}-rich-text`}
        className="rounded bg-black bg-opacity-10 p-3 leading-7"
        contentEditable
        dangerouslySetInnerHTML={{
          __html: initialContent,
        }}
      />
    </>
  )
}

type ContentEditorProps = {
  content: string
  setContent: (arg: string) => any
}

export const RichText = ({ content, setContent }: ContentEditorProps) => {
  return (
    <div className="grid gap-4 rounded bg-gray-700 p-2">
      <header className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          <select className="rounded bg-transparent px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5">
            <option value="text">Normal Text</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5">
            <span className="block aspect-square w-6 p-[.15rem]">B</span>
          </button>
          <button className="rounded px-3 py-1 font-bold italic hover:bg-white hover:bg-opacity-5">
            <span className="block aspect-square w-6 p-[.15rem]">I</span>
          </button>
          <button className="rounded px-3 py-1 font-bold underline hover:bg-white hover:bg-opacity-5">
            <span className="block aspect-square w-6 p-[.15rem]">U</span>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            title="Link"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <LinkIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Blockquote"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <BlockquoteIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Code"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <CodeBracketIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Asset"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <PhotoIcon className="w-6 p-[.15rem]" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            title="Bulleted List"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <ListBulletIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Numbered List"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <QueueListIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Code Block"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <CodeBracketSquareIcon className="w-6 p-[.15rem]" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            title="Iframe"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <FilmIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Class"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <PencilIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Table"
            className="rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <TableCellsIcon className="w-6 p-[.15rem]" />
          </button>
          <button
            title="Enter Fullscreen"
            className="ms-auto rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5"
          >
            <ViewfinderCircleIcon className="w-6 p-[.15rem]" />
          </button>
        </div>
      </header>

      <Textarea />
    </div>
  )
}