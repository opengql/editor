// import css from '../container/style/code-editor.module.css';
// import { ShareButton } from './share-button';
// import { ViewSelect } from './view-select';
// import { CodeEditorViewType } from './const/code-editor-view-type';
// import Editor from 'react-simple-code-editor';
// import { ErrorsList } from './errors-list';
// import { ParseTreeView } from './parse-tree-view';
// import React from 'react';
// import { Tooltip } from './tooltip';
// import { If } from './if';
//
// export const Template = ({ viewType }) => (
//   <div className={css.codeEditorGrid} data-testid="ti-code-editor-grid">
//     <div className={css.editorColumn} data-testid="ti-code-editor-column">
//       <Tooltip />
//       <If condition={viewType === CodeEditorViewType.EDITOR}>
//
//       </If>
//       {currentView === CodeEditorViewType.EDITOR && (
//         <>
//           <div className={css.editorWrapper} data-testid="ti-code-editor-wrapper">
//             <Editor
//               value={props.value}
//               onValueChange={handleValueChange}
//               highlight={highlight}
//               padding={0}
//               textareaId="code-textarea--input"
//               textareaClassName={css.codeArea}
//               className={css.editor}
//               onSelectCapture={() => {
//                 handleSelectCapture();
//               }}
//               autoFocus
//             />
//           </div>
//           <ErrorsList
//             errors={parseResult?.errors ?? []}
//             isParsing={isParsing ?? false}
//             isInitializing={isInitializing}
//           />
//           <Autocomplete
//             code={props.value}
//             caretData={caretData}
//             keywords={specification?.grammarDefinition.keywords ?? []}
//             textAreaElement={textArea}
//             onSuggestionAccept={handleSuggestionAccept}
//           />
//         </>
//       )}
//       {currentView === CodeEditorViewType.PARSE_TREE && (
//         <ParseTreeView isParsing={isParsing} parseTree={parseResult?.parseTree ?? []} />
//       )}
//     </div>
//     {/* <div className={css.examplesColumn} data-testid="ti-examples-column"> */}
//     {/*   <ExamplesList */}
//     {/*     grammar={grammar || {}} */}
//     {/*     examples={[]} */}
//     {/*     isLoading={isInitializing} */}
//     {/*     onExampleClick={(example) => { */}
//     {/*       // props.onValueChange(example.code); */}
//     {/*     }} */}
//     {/*   /> */}
//     {/* </div> */}
//   </div>
// );
//
// Template.propTypes = {};
