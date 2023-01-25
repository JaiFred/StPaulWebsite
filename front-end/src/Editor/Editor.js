import React, { useMemo, useState, useEffect, useRef } from "react";
import "./Editor.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ id, value, onChange, placeholder = "", heading }) => {
  
  // useEffect(() => {
  //     document.querySelectorAll('[role="dialog"]').forEach(modal =>
  //         modal.removeAttribute('tabindex')
  //     )
  // }, [])

  function uploadFiles(uploadedFile) {
    var apiUrl = `http://localhost:3000/api/images`;

    var formData = new FormData();
    formData.append('image', uploadedFile);

    // get editor
    const editor = quillRef.current.getEditor();

    try {
      if (uploadedFile != '') {
        fetch(apiUrl, {
          method: "POST",
          body: formData
        })
        .then((response) => response.json()).then((response) => {
          console.log(`Response from server: ${JSON.stringify(response)}`);
          editor.insertEmbed(editor.getSelection(), "image", response.image_url);
          // const range = quillRef.getEditorSelection();
          // quillObj.getEditor().insertEmbed(range.index, 'image', res);
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
    console.log("Uploading image handler....")
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      var file = input.files[0];
      var fileName = file.name;

      console.log(`fileName: ${fileName}`);

      const res = uploadFiles(file);
      console.log(`res: ${JSON.stringify(res)}`);
    };
  }

  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ 'header': [1, 2, false] }],
  //       ['bold', 'italic', 'underline','strike', 'blockquote'],
  //       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  //       ['link', 'image', 'video'],
  //       ['clean']
  //     ],
  //     handlers: {        
  //       'image': imageHandler
  //     }
  //   }
  // }

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

  // const imageHandler = () => {
  //   // get editor
  //   const editor = quillRef.current.getEditor();

  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     try {
  //       const link = `/api/images`;
  //       console.log(`link: ${link}`);
  //       editor.insertEmbed(editor.getSelection(), "image", link);
  //     } catch (err) {
  //       console.log("upload err:", err);
  //     }
  //   };
  // };

  // const toolbarOptions = [
  //   ["bold", "italic", "underline", "strike"],
  //   ["code-block", "link", "image", "video"]  
  // ];

  // const modules = {
  //   toolbar: {
  //     container: toolbarOptions,
  //     handlers: {
  //       image: imageHandler,
  //     },
  //   },
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // };

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

      {/* <ReactQuill
        ref={quillRef} // must pass ref here
        value={description}
        onChange={(val) => setDescription(val)}    
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Write something awesome..."
      />       */}
    </div>
  );
};

export default Editor;
