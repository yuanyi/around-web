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

  const NormalCreatePostForm = () => {
      const [form] = Form.useForm();

      const onFinish = values => {
          console.log('Received values of form: ', values);
      }

      return (
          <Form
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
                label="ImageLabel"
                >
                <Form.Item name="Image" valuePropName="fileList" getValueFromEvent={normFile} noStyle
                rules={[
                  {
                      required: true,
                      message: 'Please select file to upload',
                  },
                ]}
                >
                  <Upload.Dragger name="files">
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
  };
// }


export const CreatePostForm = NormalCreatePostForm

/*
class NormalCreatePostForm extends React.Component {
 normFile = e => {
   console.log('Upload event:', e);
   if (Array.isArray(e)) {
     return e;
   }
   return e && e.fileList;
 };

 beforeUpload = () => false;

 render() {
   //high order function
   const { getFieldDecorator } = this.props.form;
   const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 14 },
   };
   return (
     <Form {...formItemLayout}>
       <Form.Item label="Message">
         {getFieldDecorator('message', {
           rules: [{ required: true, message: 'Please input message.' }],
         })(<Input />)}
       </Form.Item>
       <Form.Item label="Image/Video">
         <div className="dropbox">
           {getFieldDecorator('image', {
             valuePropName: 'fileList',
             getValueFromEvent: this.normFile,
             rules: [{ required: true, message: 'Please select an image.' }]
           })(
             <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
               <p className="ant-upload-drag-icon">
                 <InboxOutlined />
               </p>
               <p className="ant-upload-text">Click or drag file to this area to upload</p>
               <p className="ant-upload-hint">Support for a single or bulk upload.</p>
             </Upload.Dragger>,
           )}
         </div>
       </Form.Item>
     </Form>
   );
 }
}
*/


// export const CreatePostForm = Form.create()(NormalCreatePostForm);
