import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { instance } from "~/api/adminApi";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ setFileUrl }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [filePreview, setFilePreview] = useState([]);

  // Preview ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Custom upload
  const customUpload = async ({ file, onSuccess, onError, onProgress }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await instance.post("/product/upload", formData, {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded / event.total) * 100);

          onProgress({ percent });
          setFilePreview([{ ...file, status: "uploading", percent }]);
        },
      });

      setFilePreview([{ ...file, status: "done", url: res.data.file }]);
      setFileUrl(res.data.file);

      onSuccess(res.data);

      toast.success("Upload file thành công!");
    } catch (err) {
      onError(err);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={filePreview}
        onPreview={handlePreview}
        customRequest={customUpload}
        maxCount={1}
      >
        {uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterClose: () => setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
