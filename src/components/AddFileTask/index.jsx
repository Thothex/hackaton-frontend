import styles from './style.module.scss';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


const AddFileTask = ({ task }) => {
    console.log('AddFileTask task', task)
    const prop = {
        name: 'file',
        data: {taskId: task.id, hackathonId: task.hackathon_id},
        multiple: true,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        action: `${import.meta.env.VITE_BASE_URL}/answers/${task.id}/document`,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return(
        <div className={styles.paragraphIcon}>
            <Dragger {...prop} >
                <p  className={`ant-upload-drag-icon`}>
                    <InboxOutlined />
                </p>
                <p className={`ant-upload-text ${styles.paragraph}`}>Click or drag file to this area to upload</p>
            </Dragger>
        </div>
    )
}
export default AddFileTask
