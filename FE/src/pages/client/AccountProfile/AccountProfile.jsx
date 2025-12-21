import { Button, Form, Input, Upload, message, Row, Col } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailRegex, phoneRegex } from "~/constants/regex";
import { fetchGetProfile, fetchUpdateProfile } from "~/redux/user/userSlice";
import { instance } from "~/api";
import "./AccountProfile.scss";
import { toast } from "react-toastify";

const AccountProfile = () => {
  const profile = useSelector((state) => state.user.currentUser);
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        user_name: profile.user_name,
        full_name: profile.full_name,
        phone: profile.phone,
        email: profile.email,
      });

      if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
    }
  }, [profile, form]);

  // Upload Avatar
  const handleAvatarUpload = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await instance.post("/user/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAvatarUrl(response.data.file);
      message.success("Upload ảnh đại diện thành công!");
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // Validate Image
  const handleAvatarChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (!file) return;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ chấp nhận file JPEG hoặc PNG!");
      return;
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Kích thước file không được vượt quá 1MB!");
      return;
    }

    setAvatarFile(file);
    handleAvatarUpload(file);
  };

  // Update Profile
  const onFinish = async (values) => {
    setLoading(true);
    const profileData = { ...values, avatar_url: avatarUrl };

    await toast.promise(dispatch(fetchUpdateProfile(profileData)), {
      pending: "Đang cập nhật...",
    });

    setLoading(false);
  };

  const uploadProps = {
    beforeUpload: () => false,
    fileList: avatarFile
      ? [{ uid: "-1", name: avatarFile.name, status: "done" }]
      : [],
    onChange: handleAvatarChange,
    accept: ".jpg,.jpeg,.png",
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Thông tin tài khoản</h2>

      <Row gutter={[40, 24]} justify="start" align="top">
        <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="user_name"
              label="Tên tài khoản:"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="full_name"
              label="Họ tên:"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  pattern: phoneRegex,
                  message: "Số điện thoại chỉ được chứa số",
                },
                { len: 10, message: "Số điện thoại chứa 10 chữ số" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { pattern: emailRegex, message: "Email không đúng định dạng" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}>
          <div className="profile__avatar-upload">
            <div className="profile__avatar-preview">
              {loading ? (
                <div className="profile__avatar-loading">
                  <LoadingOutlined className="profile__loading-icon" />
                </div>
              ) : avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="profile__avatar-image"
                />
              ) : (
                <div className="profile__avatar-placeholder">
                  <UserOutlined className="profile__avatar-icon" />
                </div>
              )}
            </div>

            <div className="profile__upload-info">
              <p className="profile__upload-text">
                <strong>Chọn Ảnh</strong>
              </p>
              <p className="profile__upload-note">
                Dung lượng file tối đa 2 MB
              </p>
              <p className="profile__upload-note">Định dạng: JPEG, PNG</p>
            </div>

            <Upload {...uploadProps} className="profile__upload-btn">
              <Button
                icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
                size="middle"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Đang upload..." : "Chọn ảnh"}
              </Button>
            </Upload>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AccountProfile;
