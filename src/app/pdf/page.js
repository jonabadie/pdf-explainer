'use client'

import React, { useState } from 'react';
import { Page, Document, pdfjs, Outline } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Home({ pdfUrl='https://arxiv.org/pdf/1706.03762.pdf' }) {
    const [pages, setPages] = useState([]);

    function createPages(numPages) {
        return Array.from({ length: numPages }, (_, i) => (
            <Page
                key={`page_${i + 1}`}
                pageNumber={i + 1}
            />
        ));
    }

    function onDocumentLoadSuccess({ numPages }) {
        setPages(createPages(numPages));
    }

    return (
        <div>
            <Document
                className="flex flex-col items-center h-full"
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {pages}
            </Document>
        </div>
    );
}
