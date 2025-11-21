import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = ({ content, descriptionRef }) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE}
      initialValue={content}
      onInit={(_evt, editor) => (descriptionRef.current = editor)}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};

export default TinyMCE;
