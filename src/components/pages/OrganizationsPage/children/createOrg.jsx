import { Button, Checkbox, Form, Input, Space, Upload, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { createOrganization } from '@/redux/features/organizationsSlice';
import { useState } from 'react';
import InfoTooltip from "@/components/InfoTooltip/index.jsx";

const layout = {
    labelCol: {
        span: 3,

    },
    wrapperCol: {
        span: 10,
        offset: 1
    },
};

const tailLayout = {
    wrapperCol: {
        span: 10,
        offset:2
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

        >
            <Form.Item
                name="name"
                label="Name"
                colon={false}
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
                colon={false}
                rules={[
                    {
                        required: true,
                        message: 'Please input the description!',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name="link"
                label="Link"
                colon={false}
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input the link!',
                //     },
                // ]}
            >
                <Input />
            </Form.Item>

            <Form.Item    colon={false} label="Upload image" {...tailLayout}>

                <Upload
                    fileList={fileList}
                    onChange={onChange}
                    beforeUpload={beforeUpload}
                    accept=".jpg,.jpeg,.png"

                >
                    <div>.jpg,.jpeg,.png formats are allowed</div>
                    <Button>Upload</Button>

                </Upload>

            </Form.Item>
            <Image width={350} height={200}  style={{ objectFit: 'cover', border:'1px solid black', borderRadius:20 }} src={fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj) : null} />

            <Form.Item  {...tailLayout}>
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
