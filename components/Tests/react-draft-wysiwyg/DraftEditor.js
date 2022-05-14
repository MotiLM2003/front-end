import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  ContentState,
} from 'draft-js';

const DraftEditor = ({ content }) => {
  const [state, setState] = useState(EditorState.createEmpty());

  useEffect(() => {
    console.log('content', content);
  }, []);
  return (
    <div>
      <Editor
        editorState={state}
        onEditorStateChange={(e) => {
          // const test = draftToHtml(
          //   convertToRaw(shortDesc.getCurrentContent())
          // );
          // console.log('tere', e.getCurrentContent().getPlainText());
          setState(e);
        }}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
      />
    </div>
  );
};

export default DraftEditor;

const convertToEditorStateWithDecorator = (editorContent) => {
  const decorator = new CompositeDecorator([
    {
      strategy: handleStrategy,
      component: HandleSpan,
    },
  ]);
  const content = convertFromRaw(JSON.parse(editorContent));
  const editorState = EditorState.createWithContent(content, decorator);
  return editorState;
};

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleSpan = (props) => {
  return (
    <span {...props} style={styles.handle}>
      {props.children}
    </span>
  );
};

const HashtagSpan = (props) => {
  return (
    <span {...props} style={styles.hashtag}>
      {props.children}
    </span>
  );
};
