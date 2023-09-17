'use client'

import React, { useState } from 'react';
import { Page, Document, pdfjs, Outline } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Home({ pdfUrl='https://arxiv.org/pdf/1706.03762.pdf' }) {
    const [numPages, setNumPages] = useState(null);
    const [pages, setPages] = useState([]);

    function createPages(numPages) {
        return Array.from({ length: numPages }, (_, i) => (
            <Page key={`page_${i + 1}`} pageNumber={i + 1} />
        ));
    }

    function onDocumentLoadSuccess({ numPages }) {
        const pages = createPages(numPages);
        setNumPages(numPages);
        setPages(pages);
    }

    return (
        <div>
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Outline />
                {pages}
            </Document>
        </div>
    );
}
