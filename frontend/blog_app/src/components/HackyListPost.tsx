import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  content: any;
  author: string;
}

function HackyListPost() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/blog/get-recent-posts"
        ); // Replace with your API endpoint
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderEditors = () => {
    return posts?.map((post, index) => {
      const contentState = convertFromRaw(post.content);
      const editorState = EditorState.createWithContent(contentState);

      return (
        <>
          <div key={index} className="rounded-md bg-white w-1/2 p-4">
            <Editor
              editorState={editorState}
              readOnly={true}
              onChange={() => {}}
            />
          </div>
          <p>--{post.author}</p>
        </>
      );
    });
  };

  return (
    <div className="bg-secondary opacity-75 flex flex-col justify-center items-center my-10 py-20 space-y-10">
      {renderEditors()}
    </div>
  );
}

export default HackyListPost;
