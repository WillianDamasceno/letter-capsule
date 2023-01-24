import { forwardRef, useEffect, useId } from "react"
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
import { BlockquoteIcon } from "../components/Icons"

function onInput(e: any) {
  console.warn("This evento was not implemented yet")
}

function initRichText(id: string) {
  const richTextId = `${id}-rich-text`
  const richText = document.getElementById(richTextId)

  richText?.addEventListener("input", onInput)
}

function closeRichText(id: string) {
  const richTextId = `${id}-rich-text`
  const richText = document.getElementById(richTextId)

  richText?.removeEventListener("input", onInput)
}

type TextareaProps = {
  name?: string
  initialContent?: string
}

const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ name = "", initialContent = "" }: TextareaProps, ref) => {
    const id = useId()

    useEffect(() => {
      initRichText(id)

      return () => closeRichText(id)
    }, [])

    return (
      <>
        <div
          ref={ref}
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
)

type ActionButtonProps = {
  children: React.ReactNode
  className?: string
}

const ActionButton = ({ children, className = "" }: ActionButtonProps) => {
  return (
    <button
      type="button"
      className={`${className} rounded px-3 py-1 font-bold hover:bg-white hover:bg-opacity-5`}
    >
      {children}
    </button>
  )
}

type RichTextProps = {
  name?: string
  initialContent?: string
}

export const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  ({ name = "", initialContent = "" }: RichTextProps, ref) => {
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
            <ActionButton>
              <span className="block aspect-square w-6 p-[.15rem]">B</span>
            </ActionButton>
            <ActionButton className="italic">
              <span className="block aspect-square w-6 p-[.15rem]">I</span>
            </ActionButton>
            <ActionButton className="underline">
              <span className="block aspect-square w-6 p-[.15rem]">U</span>
            </ActionButton>
          </div>
          <div className="flex gap-2">
            <ActionButton>
              <LinkIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <BlockquoteIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <CodeBracketIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <PhotoIcon className="w-6 p-[.15rem]" />
            </ActionButton>
          </div>
          <div className="flex gap-2">
            <ActionButton>
              <ListBulletIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <QueueListIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <CodeBracketSquareIcon className="w-6 p-[.15rem]" />
            </ActionButton>
          </div>
          <div className="flex gap-2">
            <ActionButton>
              <FilmIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <PencilIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <TableCellsIcon className="w-6 p-[.15rem]" />
            </ActionButton>
            <ActionButton>
              <ViewfinderCircleIcon className="w-6 p-[.15rem]" />
            </ActionButton>
          </div>
        </header>

        <Textarea ref={ref} name={name} initialContent={initialContent} />
      </div>
    )
  }
)
