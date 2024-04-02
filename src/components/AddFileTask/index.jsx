import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const AddFileTask = ({ task, teamId, showToast, disabled }) => {
  const { t } = useTranslation();
  const prop = {
    name: "file",
    data: { taskId: task.id, hackathonId: task.hackathon_id, teamId },
    multiple: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    action: `${import.meta.env.VITE_BASE_URL}/answers/${task.id}/document`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        showToast();
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div className={styles.paragraphIcon}>
      <Dragger disabled={disabled} {...prop}>
        <p className={`ant-upload-drag-icon`}>
          <InboxOutlined />
        </p>
        <p className={`ant-upload-text ${styles.paragraph}`}>
          {t("TestPage.Click or drag file to this area to upload")}
        </p>
      </Dragger>
    </div>
  );
};
export default AddFileTask;
