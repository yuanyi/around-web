import { Modal, Button, message } from 'antd';
import React from 'react';
import { CreatePostForm } from './CreatePostForm';
import {
    POSITION_KEY,
    TOKEN_KEY,
    API_ROOT,
    AUTH_HEADER,
    POSITION_NOISE,
} from '../constants';

export class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
        confirmLoading: true,
    });

    this.form.validateFields()
    .then(values => {
      console.log('Received values of form ', values);
      const position = JSON.parse(localStorage.getItem(POSITION_KEY));
      const token = localStorage.getItem(TOKEN_KEY);
      const formData = new FormData();
      //console.log('test point1');
      console.log('position = ', position);
      console.log('values = ', values);
      formData.append('lat', position.latitude + Math.random() * POSITION_NOISE * 2 - + POSITION_NOISE);
      formData.append('lon', position.longitude + Math.random() * POSITION_NOISE * 2 - + POSITION_NOISE);
      formData.append('mesasge', values.Message);
      formData.append('image', values.Image[0].originFileObj);
      //console.log('test point4');
      fetch(`${API_ROOT}/post`, {
          method: 'POST',
          body: formData,
          headers: {
              Authorization: `${AUTH_HEADER} ${token}`,
          },
          dateType: 'text',
      }).then((response) => {
        if (response.ok) {
          message.success('Create post succeed!');
          this.form.resetFields();
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          if (this.props.onSuccess) {
            this.props.onSuccess();
          }
        } else {
          message.error('Create post failed.');
          this.setState({
            confirmLoading: false,
          })
        }
      });

    })
    .catch(errorInfo => {
      console.log('Some information missing in the form');
      this.setState({
        confirmLoading: false,
      });
    })

  };

/*
  handleOk = () => {

    if (!err) {
      console.log('Received values of form ', values);

      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    } else {
      this.setState({
        confirmLoading: true,
      });
    }

  };
*/

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  getFormRef = (formInstance) => {
    this.form = formInstance;
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          okText="Create"
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <CreatePostForm ref={this.getFormRef}/>
        </Modal>
      </div>
    );
  }
}
