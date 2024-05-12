import { Button, Checkbox, Form, Input, Space, Upload, Image } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { createOrganization } from '@/redux/features/organizationsSlice';
import { useState } from 'react';
import InfoTooltip from "@/components/InfoTooltip/index.jsx";
import {useTranslation} from "react-i18next";

const layout = {
    labelCol: {
        span: 4,

    },
    wrapperCol: {
        span: 10,
        offset: 2
    },
};

const tailLayout = {
    wrapperCol: {
        span: 10,
        offset:2
    },
};

const CreateOrganizations = () => {
    const { userInfo } = useSelector((state) => state.userStore);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([]);
    const [status, setStatus] = useState('');
    const { t } = useTranslation();
    const onFinish = async (values) => {
        const { name, description, link } = values;
        const picture = fileList[0].originFileObj;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("link", link);
        formData.append("picture", picture);
        formData.append("userID", userInfo?.id)
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
                label={t(`OrgPage.name`)}
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
                label={t(`OrgPage.descr`)}
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
                label={t(`OrgPage.link`)}
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

            <Form.Item    colon={false} label={t(`OrgPage.uploadImg`)} {...tailLayout}>

                <Upload
                    fileList={fileList}
                    onChange={onChange}
                    beforeUpload={beforeUpload}
                    accept=".jpg,.jpeg,.png"

                >
                    <div>{t(`OrgPage.format`)}</div>
                    <Button>{t(`OrgPage.upload`)}</Button>

                </Upload>

            </Form.Item>
            <Image width={350} height={200}  style={{ objectFit: 'cover', border:'1px solid black', borderRadius:20 }} src={fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj) : null} />

            <Form.Item  {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        {t(`OrgPage.create`)}
                    </Button>
                    <Button htmlType="button" onClick={() =>handleReset()}>
                        {t(`OrgPage.reset`)}
                    </Button>
                </Space>
            </Form.Item>
        </Form>

        </div>
    );
};

export default CreateOrganizations;
