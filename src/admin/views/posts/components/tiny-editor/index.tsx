import React from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { getGalleryImages } from '../../../../service/admin-gallery.service';
import { AppImage } from '../../../../../shared/models/classes/app-image';

export default function TinyEditor({ editorChange, value }: { editorChange: any; value: string }) {
  const handleEditorChange = (content: any, editor: any) => {
    editorChange(content);
  };
  const activateCalled = (event: any, editor: any) => {
    editor.setContent(value);
  };

  const getImages = async (): Promise<any> => {
    const images: AppImage[] = await getGalleryImages();
    return images.map((image) => ({ title: image.label, value: image.url }));
  };
  return (
    <Editor
      value={value}
      onInit={activateCalled}
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
        image_list: function (success: any) {
          getImages().then((images) => success(images));
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
}
