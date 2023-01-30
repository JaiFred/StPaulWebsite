import { useState } from 'react';
import './File.scss'

const FileInput = (props) => {
    const [file, setFile] = useState(props.file);
    const [isPDF, setIsPDF] = useState(typeof props.file === 'string' && props.file.endsWith('pdf'));

    const handleChange = (onChange, event) => {
        // When user cancels selection
        if (!event.target.files.length) return;

        // Local state to display file/s
        const [file] = event.target.files
        setFile(URL.createObjectURL(file));
        setIsPDF(file.type === 'application/pdf');

        // Handles file
        onChange(event);
    }

    console.log({file})

    return (
        <label className="input-file">
            <h6>Select Documents</h6>

            <input
                {...props}
                type="file"
                hidden
                onChange={handleChange.bind(null, props.onChange)}
            />
            
            {!file && (
                <div className="file-input__unchosen">
                    <span>Choose file</span>
                    <span>No file chosen</span>
                </div>
            )}

            {file && (
                <div className="file-input__chosen bold">
                    {/* Display file */}
                    {isPDF
                        ? <embed className="text-center-image w-100" src={file} target="_parent" /> 
                        : <img className="text-center-image mw-100" src={typeof file === 'string' ? file : URL.createObjectURL(file)} />}
                    
                    <div>
                        <button className="button-custom button-small mt-2 mb-4" type="button" onClick={e => e.target.parentNode.click()}>
                            (click to change files)
                        </button>
                    </div>
                </div>
            )}
        </label>
    )
}

export default FileInput;
