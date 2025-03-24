import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles

export default function useQuillEditor(placeholder = "Description") {
    const quillRef = useRef(null);
    const editorRef = useRef(null); // Store Quill instance

    useEffect(() => {
        if (quillRef.current && !editorRef.current) {
            // Initialize Quill only once
            editorRef.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                    ],
                },
                placeholder,
            });
        }
    }, [placeholder]);
    
    return {quillRef,editorRef};
}
