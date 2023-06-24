import React from "react";
import {  Form,  Input, Modal,  } from "antd";


interface AddUserTaskFormProps {
    openUserTask: boolean;
    onUserTaskCreate: (values: UserTaskInfo) => void;
    onUserTaskCancel: () => void;
  }

  interface UserTaskInfo {
    userName: string;
    taskName: string;
  }
  
  

const AddUserTaskForm: React.FC<AddUserTaskFormProps> = ({
    openUserTask,
    onUserTaskCreate,
    onUserTaskCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={openUserTask}
        title="Add a task for a new user"
        okText="Add"
        cancelText="Cancel"
        onCancel={onUserTaskCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onUserTaskCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="user_task_form"
        >
          <Form.Item
            name="userName"
            label="User Name"
            rules= {[
              { required: true, message: 'Please input the user name' },
             {
                 pattern: /^[A-Za-z0-9_]+$/,
                 message: 'User name should only contain letters, numbers and underscore',
             },
           ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="taskName" label="Task Name"  rules= {[
               { required: true, message: 'Please input the task name' },
              {
                  pattern: /^[A-Za-z0-9\s_]+$/,
                  message: 'Task name should only contain letters, numbers,spaces and underscore',
              },
            ]}>
            <Input type="textarea" /> 
          </Form.Item>
        </Form>
      </Modal>
    );
  }


  export default AddUserTaskForm; 