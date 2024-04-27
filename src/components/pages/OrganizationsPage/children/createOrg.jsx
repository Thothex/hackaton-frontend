import { Button, Checkbox, Form, Input, Space, Upload, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { createOrganization } from '@/redux/features/organizationsSlice';
import { useState } from 'react';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const CreateOrganizations = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([]);
    const [status, setStatus] = useState('');
    const onFinish = async (values) => {
        const { name, description } = values;
        const picture = fileList[0].originFileObj;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("picture", picture);

        try {
            const response = await dispatch(createOrganization( {formData}));

           if(response.payload.status >= 300){
               setStatus(response.payload.error.error)
               console.log(response.payload.error.error)
           }
           else{
               setStatus('successfully created!')
                form.resetFields();
           }

        } catch (error) {
            console.error('Failed to create organization', error);
        }
    };



    const onChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const beforeUpload = (file) => {
        // Дополнительная проверка перед загрузкой, если нужно
        return true;
    };
    const handleReset =()=>{
        form.resetFields();
        setStatus('')
    }

    return (
        <div>
            {status && <p>{status}</p>}
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input the description!',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Upload" {...tailLayout}>
                <Upload
                    fileList={fileList}
                    onChange={onChange}
                    beforeUpload={beforeUpload}
                    accept=".jpg,.jpeg,.png"
                >
                    <Button>Upload</Button>
                </Upload>
            </Form.Item>
            <Image width={200} src={fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj) : null} />
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={() =>handleReset()}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
        </div>
    );
};

export default CreateOrganizations;
