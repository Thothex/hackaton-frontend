import { useState } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Modal, Upload } from "antd";
import { userUpdateThunk } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const AddAvatar = ({ onCloseModal }) => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.userStore);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        {t("ProfilePage.update")}
      </div>
    </button>
  );

  const handleUpdateUser = () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("picture", fileList[0].originFileObj);
      dispatch(userUpdateThunk({ id: userInfo.id, formData }));
      onCloseModal();
    }
  };

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <h2 className={styles.title}>{t("ProfilePage.upload-new-avatar")}</h2>
      <Upload
        customRequest={dummyRequest}
        accept=".png,.jpg,.jpeg"
        fileList={fileList}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <button className={styles.save} onClick={handleUpdateUser}>
        {t("ProfilePage.save")}
      </button>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" src={previewImage} />
      </Modal>
    </>
  );
};

AddAvatar.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default AddAvatar;
