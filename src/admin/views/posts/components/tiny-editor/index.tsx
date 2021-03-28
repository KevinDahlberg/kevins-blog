import React from 'react';

import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({ editorChange }: { editorChange: any }) {
  const handleEditorChange = (content: any, editor: any) => {
    editorChange(content);
  };
  return (
    <Editor
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
      }}
      onEditorChange={handleEditorChange}
    />
  );
}
