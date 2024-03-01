// import React, { useCallback, useEffect, useState } from 'react';
// import Editor from 'react-simple-code-editor';
// import css from './style/code-editor.module.css';
// import PropTypes from 'prop-types';
// import { CodeEditorViewType } from '../component/const/code-editor-view-type';
// import { useParsing } from '../hook/parsing';
// import { useHighlights } from '../hook/highlights';
// import { useCodeLoader } from '../hook/code-loader';
// import { ShareButton } from '../component/share-button';
// import { ViewSelect } from '../component/view-select';
// import { ErrorsList } from '../component/errors-list';
// import { Autocomplete } from '../component/autocomplete.component';
// // import { ExamplesList } from './examples-list';
// import { ParseTreeView } from '../component/parse-tree-view';
// import { useCaretHandler } from '../hook/caret-handler';
// import { connect } from 'react-redux';
// import { editorActions } from '../state/slice/editor-slice';
// import { EditorState } from '../const/editor-state';
//
// const CodeEditorImpl = (props) => {
//   const caretHandler = useCaretHandler();
//
//   const [currentView, setCurrentView] = useState(CodeEditorViewType.EDITOR);
//   const { isParsing, isInitializing, parseResult, specification } = useParsing(props.value);
//   const { highlight } = useHighlights({ specification, parseResult });
//   const loadedCode = useCodeLoader();
//   const [textArea, setTextArea] = useState(undefined);
//   const [newCaretIndex, setNewCaretIndex] = useState(-1);
//
//   const handleValueChange = (value) => {
//     if (textArea === undefined || props.value === value) {
//       return;
//     }
//
//     props.onValueChange(value);
//     caretHandler.update(textArea);
//   };
//
//   const handleSuggestionAccept = (suggestion, wordData) => {
//     if (wordData === undefined) {
//       return;
//     }
//
//     let value = props.value;
//
//     if (wordData.startIndex !== -1) {
//       const before = value.substring(0, wordData.startIndex);
//       const after = value.substring(wordData.startIndex + wordData.length);
//       value = `${before}${suggestion} ${after}`;
//     }
//
//     setNewCaretIndex(wordData.startIndex + suggestion.length + 1);
//     handleValueChange(value);
//   };
//
//   const handleSelectCapture = useCallback(() => {
//     if (newCaretIndex === -1 || textArea === undefined) {
//       return;
//     }
//
//     textArea.setSelectionRange(newCaretIndex, newCaretIndex);
//     setNewCaretIndex(-1);
//   }, [textArea, newCaretIndex]);
//
//   useEffect(() => {
//     const textAreaElement = document.getElementById('code-textarea--input');
//
//     if (textAreaElement === null) {
//       return;
//     }
//
//     setTextArea(textAreaElement ?? undefined);
//
//     const caretChange = () => caretHandler.update(textAreaElement);
//
//     textAreaElement.addEventListener('click', caretChange);
//     textAreaElement.addEventListener('contextmenu', caretChange);
//     textAreaElement.addEventListener('keypress', caretChange);
//
//     return () => {
//       textAreaElement.removeEventListener('click', caretChange);
//       textAreaElement.removeEventListener('contextmenu', caretChange);
//       textAreaElement.removeEventListener('keypress', caretChange);
//     };
//   }, [currentView]);
//
//   useEffect(() => {
//     if (loadedCode === undefined) {
//       return;
//     }
//
//     handleValueChange(loadedCode);
//   }, [loadedCode]);
//
//   return (
//     <div className={css.codeEditorGrid} data-testid="ti-code-editor-grid">
//       <div className={css.editorColumn} data-testid="ti-code-editor-column">
//         <div className={css.editorHeader} data-testid="ti-code-editor-column-title">
//           Code Editor
//         </div>
//         <div className={css.editorTooltip} data-testid="ti-code-editor-toolbar">
//           <ShareButton code={props.value} />
//           <div className={css.editorTooltipSeparator} />
//           <ViewSelect
//             value={currentView}
//             isParseTreeViewDisabled={isInitializing || isParsing}
//             onViewSelectChange={(viewType) => {
//               setCurrentView(viewType);
//             }}
//           />
//           <div className={css.editorTooltipSeparator} />
//         </div>
//         {currentView === CodeEditorViewType.EDITOR && (
//           <>
//             <div className={css.editorWrapper} data-testid="ti-code-editor-wrapper">
//               <Editor
//                 value={props.value}
//                 onValueChange={handleValueChange}
//                 highlight={highlight}
//                 padding={0}
//                 textareaId="code-textarea--input"
//                 textareaClassName={css.codeArea}
//                 className={css.editor}
//                 onSelectCapture={() => {
//                   handleSelectCapture();
//                 }}
//                 autoFocus
//               />
//             </div>
//             <ErrorsList
//               errors={parseResult?.errors ?? []}
//               isParsing={isParsing ?? false}
//               isInitializing={isInitializing}
//             />
//             <Autocomplete
//               code={props.value}
//               caretData={caretData}
//               keywords={specification?.grammarDefinition.keywords ?? []}
//               textAreaElement={textArea}
//               onSuggestionAccept={handleSuggestionAccept}
//             />
//           </>
//         )}
//         {currentView === CodeEditorViewType.PARSE_TREE && (
//           <ParseTreeView isParsing={isParsing} parseTree={parseResult?.parseTree ?? []} />
//         )}
//       </div>
//       {/* <div className={css.examplesColumn} data-testid="ti-examples-column"> */}
//       {/*   <ExamplesList */}
//       {/*     grammar={grammar || {}} */}
//       {/*     examples={[]} */}
//       {/*     isLoading={isInitializing} */}
//       {/*     onExampleClick={(example) => { */}
//       {/*       // props.onValueChange(example.code); */}
//       {/*     }} */}
//       {/*   /> */}
//       {/* </div> */}
//     </div>
//   );
// };
//
// CodeEditorImpl.propTypes = {
//   state: PropTypes.oneOf(Object.values(EditorState)),
//   value: PropTypes.string.isRequired,
//   onValueChange: PropTypes.func.isRequired,
// };
//
// const mapStateToProps = (state) => ({
//   state: state.editor.state,
//   value: state.editor.value,
// });
//
// const mapActionsToCallbacks = {
//   onValueChange: editorActions.setValue,
// };
//
// export const CodeEditor = connect(mapStateToProps, mapActionsToCallbacks)(CodeEditorImpl);
