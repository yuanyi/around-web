import React from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';


// class NormalCreatePostForm extends React.Component {



  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };


  const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const NormalCreatePostForm = React.forwardRef((props, ref) => {
      const [form] = Form.useForm();

      const onFinish = values => {
          console.log('Received values of form: ', values);
      }

      return (
          <Form
              ref={ref}
              {...formItemLayout}
              form={form}
              name="Upload"
              onFinish={onFinish}
              scrollToFirstError
              className="Upload-form"
          >
              <Form.Item
                  name="Message"
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your message!',
                    },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                // name="ImageLabel"
                label="Image/Video"
                >
                <Form.Item name="Image" valuePropName="fileList" getValueFromEvent={normFile} noStyle
                rules={[
                  {
                      required: true,
                      message: 'Please select file to upload',
                  },
                ]}
                >
                  <Upload.Dragger name="files" beforeUpload={() => false}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>


          </Form>
      );
  });
// }

export const CreatePostForm = NormalCreatePostForm;
