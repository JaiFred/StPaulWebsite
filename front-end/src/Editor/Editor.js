import React, { useEffect, useRef } from "react";
import "./Editor.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ id, value, onChange, placeholder = "", heading }) => {
  // const editorRef = useRef(null);

  useEffect(() => {
      document.querySelectorAll('[role="dialog"]').forEach(modal =>
          modal.removeAttribute('tabindex')
      )
  }, [])

  function uploadFiles(uploadFileObj, filename, quillObj) {
    var apiUrl = `/api/images`;

    try {
      if (uploadFileObj != '') {
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;odata=verbose'
          },
          body: uploadFileObj // This is your file object
        }).then((response) => {
          console.log(response);
          const range = quillObj.getEditorSelection();

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
      var formData = new FormData();

      formData.append('image', file);

      var fileName = file.name;

      console.log(`fileName: ${fileName}`);

      const res = uploadFiles(file, fileName, quillObj);
      console.log(`res: ${JSON.stringify(res)}`);
    };
  }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {        
        'image': imageHandler
      }
    }
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  var quillObj;

  return (
    <div className="editor-wrapper">
      {heading && <h2>{heading}</h2>}

      <ReactQuill
       ref={(el) => {  
        quillObj = el;  
        }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
      />;
    </div>
  );
};

export default Editor;
