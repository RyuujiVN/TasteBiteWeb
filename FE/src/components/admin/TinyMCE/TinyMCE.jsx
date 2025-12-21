import { Editor } from "@tinymce/tinymce-react";
import { instance } from "~/api";

const TinyMCE = ({ content, descriptionRef }) => {
  const hanldeUploadImage = async (blobInfo) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob());
    const res = await instance.post("/product/upload", formData);
    return res.data.file;
  };

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
          "code",
        ],
        toolbar:
          "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | insertfile | code",
        spellchecker_dialog: true,
        automatic_uploads: true,
        images_reuse_filename: true,
        images_upload_handler: hanldeUploadImage,
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        file_picker_types: "image",
      }}
    />
  );
};

export default TinyMCE;
