import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = ({ content, descriptionRef }) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE}
      initialValue={content}
      onInit={(_evt, editor) => (descriptionRef.current = editor)}
      init={{
        height: 500,
        // menubar: false,
        resize: false,
        plugins: [
          "advlist",
          "anchor",
          "autolink",
          "codesample",
          "fullscreen",
          "help",
          "image",
          "imagetools",
          "lists",
          "link",
          "media",
          "preview",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
          "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        spellchecker_dialog: true,
        automatic_uploads: true,
        images_reuse_filename: true,
        // images_upload_handler: handleImageUpload,
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
      }}
    />
  );
};

export default TinyMCE;
