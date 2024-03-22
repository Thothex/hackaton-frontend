import styles from './style.module.scss';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const prop = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
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
const AddFileTask = (props) =>{
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