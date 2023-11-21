import { MouseEventHandler, useState } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  ContentState,
  Modifier,
  DraftHandleValue,
} from "draft-js";
import "draft-js/dist/Draft.css";

function PostEditor() {
  const [editorState, setEditorState] = useState(() => {
    // Create a ContentState with 5 blank lines
    const initialContentState = ContentState.createFromText("\n\n\n\n\n");
    return EditorState.createWithContent(initialContentState);
  });

  const handleStyleChange = (style: string) => {
    console.log(style);
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleTab = (event: React.KeyboardEvent) => {
    // Handle tab key to insert 4 spaces
    event.preventDefault(); // Prevent the default behavior
    setEditorState((prevState) => {
      const selection = prevState.getSelection();
      const contentState = Modifier.replaceText(
        prevState.getCurrentContent(),
        selection,
        "    " // 4 spaces
      );
      return EditorState.push(prevState, contentState, "insert-characters");
    });
  };

  const handleList = (listType: string, event: React.MouseEvent) => {
    event.preventDefault();
    setEditorState((prevState) => {
      const selection = prevState.getSelection();
      const contentState = Modifier.splitBlock(
        prevState.getCurrentContent(),
        selection
      );
      const blockType = prevState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      const newBlockType = blockType === listType ? "unstyled" : listType;

      const newContentState = Modifier.setBlockType(
        contentState,
        selection,
        newBlockType
      );

      return EditorState.push(prevState, newContentState, "change-block-type");
    });
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="bg-secondary opacity-75 flex flex-col justify-center items-center my-10 py-20">
      <div className="flex space-x-6 ml-10 p-2 select-none">
        <input
          type="button"
          value="Bold"
          className={`rounded-md p-2  w-14 cursor-pointer ${
            currentStyle.has("BOLD")
              ? " bg-white"
              : "bg-primary text-white text-center"
          }`}
          onMouseDown={(event) => {
            event.preventDefault();
            handleStyleChange("BOLD");
          }}
          style={{ fontWeight: currentStyle.has("BOLD") ? "bold" : "normal" }}
        />

        <input
          onMouseDown={(event) => {
            event.preventDefault();
            handleStyleChange("ITALIC");
          }}
          type="button"
          value="Italic"
          className={`rounded-md p-2 w-14 cursor-pointer ${
            currentStyle.has("ITALIC")
              ? " bg-white"
              : "bg-primary text-white text-center"
          }`}
          style={{
            fontStyle: currentStyle.has("ITALIC") ? "italic" : "normal",
          }}
        />
        <input
          onMouseDown={(event) => {
            event.preventDefault();
            handleStyleChange("CODE");
          }}
          type="button"
          value="Code"
          className={`rounded-md p-2 w-14 cursor-pointer ${
            currentStyle.has("CODE")
              ? " bg-white"
              : "bg-primary text-white text-center"
          }`}
        />

        <label className="relative flex items-center">
          <input
            onMouseDown={(event) => {
              handleList("unordered-list-item", event);
            }}
            type="button"
            className="rounded-md p-2 w-14 cursor-pointer bg-primary text-white text-center"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            className="absolute ml-4 pointer-events-none"
          >
            <path
              fill="white"
              d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"
            />
          </svg>
        </label>
        <label className="relative flex items-center">
          <input
            onMouseDown={(event) => {
              handleList("ordered-list-item", event);
            }}
            type="button"
            className="rounded-md p-2 w-14 cursor-pointer bg-primary text-white text-center"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            className="absolute ml-4 pointer-events-none"
          >
            <path
              fill="white"
              d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z"
            />
          </svg>
        </label>
      </div>
      <div className="rounded-md bg-white w-1/2 p-4">
        <Editor
          editorState={editorState}
          onChange={(editorState: EditorState) => {
            console.log(convertToRaw(editorState.getCurrentContent()));
            setEditorState(editorState);
          }}
          onTab={handleTab}
        />
      </div>
    </div>
  );
}

export default PostEditor;
