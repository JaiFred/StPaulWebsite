import React, { useEffect, useRef } from "react";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import "./Editor.scss";
// import '@tinymce/tinymce-react/plugins/link';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ id, value, onChange, placeholder = "", heading }) => {
  const editorRef = useRef(null);

  useEffect(() => {
      document.querySelectorAll('[role="dialog"]').forEach(modal =>
          modal.removeAttribute('tabindex')    
      )
  }, [])

  function image_upload_handler (blobInfo, success, failure, progress) {
    console.log('inside image_upload_handler!!!!')
    var xhr, formData;
  
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', '/api/images');
  
    xhr.upload.onprogress = function (e) {
      progress(e.loaded / e.total * 100);
    };
  
    xhr.onload = function() {
      var json;
  
      if (xhr.status === 403) {
        failure('HTTP Error: ' + xhr.status, { remove: true });
        return;
      }
  
      if (xhr.status < 200 || xhr.status >= 300) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }
  
      json = JSON.parse(xhr.responseText);
  
      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
  
      success(json.location);
    };
  
    xhr.onerror = function () {
      failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    };
  
    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
  
    xhr.send(formData);
  };
  // );
  

  console.log(`process.env.REACT_APP_TINY_KEY: ${process.env.REACT_APP_TINY_KEY}`);

  return (
    <div className="editor-wrapper">
      {heading && <h2>{heading}</h2>}

      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange}
      />;

      {/* <TinyMCE
        id={id}
        apiKey={process.env.REACT_APP_TINY_KEY}
        onEditorChange={onChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        imagesUploadUrl="http://localhost:3000/api/images"
        init={{
          selector: 'textarea',
          // images_upload_handler: image_upload_handler          
          //automatic_uploads: true,
          image_title: true,
          height: 500,
          menubar: 'file edit view insert format tools table tc help',
          plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable export'.split(' '),
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      {/* /> */}
    </div>
  );
};

export default Editor;
