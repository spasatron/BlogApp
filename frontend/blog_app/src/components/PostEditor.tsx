import { MouseEventHandler, useState } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  ContentState,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useUser } from "../contexts/UserContext";

function PostEditor() {
  const { token } = useUser();
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

  const handlePostSubmit = async () => {
    console.log("Trying to Submit a Post");
    const postData = {
      title: "My First Post",
      content: convertToRaw(editorState.getCurrentContent()),
    };

    console.log(JSON.stringify(postData));
    const result = await fetch(
      "http://localhost:8000/api/v1/blog/create-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Add any other headers as needed
        },
        body: JSON.stringify(postData),
      }
    );
  };

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
              d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z"
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
      <button onClick={handlePostSubmit}>Submit Post to Database</button>
    </div>
  );
}

export default PostEditor;
