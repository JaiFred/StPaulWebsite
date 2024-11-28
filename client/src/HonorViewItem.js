import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";
import { fetchDocuments } from './utils';
import { isSafeHTML } from "./utils";
import { Link } from "react-router-dom";

import './HonorViewItem.scss';

const File = ({ file }) => {
    const isPDF = file.endsWith('.pdf');
    
    if (isPDF) {
        return <embed className="honor-view-item__banner text-center-image" src={file} target="_parent" />
    }
    else {
        return <div className="honor-view-item__banner" style={{ backgroundImage: `url(${file})`  }} />
    }
}

function HonorViewItem(props) {
    const { id } = useParams();
    const [document, setDocument] = useState(null);

    // console.log({ id, document })

    useEffect(() => {
        fetchDocuments(documents => 
            setDocument(documents.find(doc => doc.id === +id))
        );
    }, [id])

    if (!document) return null;

    // console.log({document})

    return (
        <div className="honor-view-item">
            <div className="honor-view__file-wrapper">
                <File file={document.file} />
            </div>
            <main className="dark-buttons">
                <div className="honor-view-item__content" dangerouslySetInnerHTML={{ __html: isSafeHTML(document.description) }} />
                <Link className="back-to-honor-page button-small button-custom mx-auto" to={`/honors`}>Back</Link>
            </main>
        </div>
    )
}

export default HonorViewItem