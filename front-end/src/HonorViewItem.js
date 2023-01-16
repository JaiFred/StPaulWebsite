import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";
import { fetchDocuments } from './Honors/utils';
import { Link } from "react-router-dom";

import './HonorViewItem.scss';

const isSafeHTML = html => html.replaceAll('<script', '');

function HonorViewItem(props) {
    const { id } = useParams();
    const [document, setDocument] = useState(null);

    console.log({ id, document })

    useEffect(() => {
        fetchDocuments(documents => 
            setDocument(documents.find(doc => doc.id === +id))
        );
    }, [id])

    if (!document) return null;

    return (
        <div className="honor-view-item">
            <div className="honor-view-item__banner" style={{ backgroundImage: `url(${document.file})`  }} />
            <div className="honor-view-item__content" dangerouslySetInnerHTML={{ __html: isSafeHTML(document.description) }} />

            <Link className="back-to-honor-page" to={`/honors`}>Back</Link>
            
        </div>
    )
}

export default HonorViewItem