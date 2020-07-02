import { Modal, Button } from 'antd';
import React from 'react';
import { CreatePostForm } from './CreatePostForm';

export class CreatePostButton extends React.Component {
  state = {
    ModalText: 'Content of the modal',
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
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });



    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

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
    const { visible, confirmLoading, ModalText } = this.state;
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
