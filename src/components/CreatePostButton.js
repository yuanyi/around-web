import { Modal, Button } from 'antd';
import React from 'react';
import { CreatePostForm } from './CreatePostForm';

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

      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    })
    .catch(errorInfo => {
      console.log('Some infomration missing in the form');
      this.setState({
        confirmLoading: true,
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
