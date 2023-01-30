import React, { useMemo, useRef } from "react";
import "./Editor.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ id, value, onChange, placeholder = "", heading, aspectRatio }) => {
  function uploadFiles(uploadedFile) {
    var apiUrl = `http://localhost:3000/api/images`; // TODO: make it work for production URL too when we deploy to heroku.

    var formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('aspect_ratio', aspectRatio);

    // get editor
    const editor = quillRef.current.getEditor();

    try {
      if (uploadedFile != '') {
        fetch(apiUrl, {
          method: "POST",
          body: formData
        })
        .then((response) => response.json()).then((response) => {
          editor.insertEmbed(editor.getSelection(), "image", response.image_url);
        }).catch((error) =>
          console.log(error)
        );
      }
    }
    catch (error) {
      console.log('uploadFiles : ' + error);
    }
  }

  function imageHandler() {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      var file = input.files[0];
      uploadFiles(file);
    };
  }

  const formats = [
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'image',
    'video',
  ]

  const quillRef = useRef();

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block' ],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image', 'video']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [])

  return (
    <div className="editor-wrapper">
      {heading && <h2>{heading}</h2>}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          defaultValue={value}
          onChange={onChange}
        />;
    </div>
  );
};

export default Editor;
