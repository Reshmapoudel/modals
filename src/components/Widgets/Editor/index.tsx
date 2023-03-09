import React, { useState } from 'react'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import { convertToHTML } from 'draft-convert'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorProps } from 'react-draft-wysiwyg'
import { docketFormElement } from '@/types'

interface EditorConvertProps {
  data: (status: string) => void
  elementData?: docketFormElement
}

const EditorConvert: React.FC<EditorConvertProps> = ({ elementData, data }) => {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(`${elementData?.label}`)
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )

    return EditorState.createWithContent(contentState)
  })
  const [convertedContent, setConvertedContent] = useState(null)
  const handleEditorChange = (state) => {
    setEditorState(state)
    // convertContentToHTML()
  }

  const handleEditorChanges = (state) => {
    data(state.target.innerHTML)
  }

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    data(currentContentAsHTML)
    setConvertedContent(currentContentAsHTML)
  }

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onBlur={(e) => {
          handleEditorChanges(e)
        }}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: {},
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  )
}

export default EditorConvert
