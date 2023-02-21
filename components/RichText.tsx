import ReactQuill from "react-quill"
import { forwardRef, useState } from "react"

type RichTextProps = {
  defaultValue?: string
}

export const RichText = forwardRef<ReactQuill, RichTextProps>(
  ({ defaultValue = "" }: RichTextProps, ref) => {
    const [value, setValue] = useState(defaultValue)

    return (
      <ReactQuill
        modules={{
          toolbar: [
            [
              { header: [1, 2, 3, false] },
              { size: ["small", false, "large", "huge"] },
              { font: [] },
            ],
            ["bold", "italic", "underline", "strike"],
            ["link", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["image", { color: [] }, { background: [] }, { align: [] }],
            ["clean"],
          ],
        }}
        className="quill-custom-theme-dark"
        defaultValue={defaultValue}
        value={value}
        onChange={setValue}
        placeholder="Initial description about the letter"
        ref={ref}
      />
    )
  }
)
