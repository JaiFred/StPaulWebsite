import React, { useEffect, useRef } from "react";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import "./Editor.scss";
// import '@tinymce/tinymce-react/plugins/link';

const Editor = ({ id, value, onChange, placeholder = "", heading }) => {
  const editorRef = useRef(null);

  useEffect(() => {
      document.querySelectorAll('[role="dialog"]').forEach(modal =>
          modal.removeAttribute('tabindex')    
      )
  }, [])

  return (
    <div className="editor-wrapper">
      {heading && <h2>{heading}</h2>}

      <TinyMCE
        id={id}
        apiKey={process.env.REACT_APP_TINY_KEY}
        onEditorChange={onChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        imagesUploadUrl="/upload"
        init={{
          height: 500,
          menubar: 'file edit view insert format tools table tc help',
          plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable export'.split(' '),
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
};

export default Editor;
