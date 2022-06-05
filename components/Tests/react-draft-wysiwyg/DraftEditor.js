import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    EditorState,
    convertToRaw,
    convertFromRaw,
    CompositeDecorator,
    ContentState,
} from 'draft-js';

const DraftEditor = ({ state, setState }) => {
    console.log('state', state);
    useEffect(() => {
        // console.log(state);
        if (state) {
            try {
                console.log('storeContent', state);
                const storeContent = ConvertToContent(state);
                // console.log('storeContent', );
                // // console.log(' editor content', state);
                setState(EditorState.createWithContent(storeContent));
            } catch (error) {
                // console.log('empty error:', error, 'content: ', state);
                // setState(EditorState.createEmpty());
            }
        }
    }, []);
    return ( <
        div > {
            state && ( <
                Editor editorState = { state }
                onEditorStateChange = {
                    (e) => {
                        setState(e);
                        console.log(e);
                    }
                }
                toolbarClassName = 'toolbarClassName'
                wrapperClassName = 'wrapperClassName'
                editorClassName = 'editorClassName' /
                >
            )
        } <
        /div>
    );
};

export default DraftEditor;

export const ConvertToRawJson = (content) => {
    return JSON.stringify(convertToRaw(content.getCurrentContent()));
};

export const ConvertToContent = (content) => {
    return convertFromRaw(JSON.parse(content));
};