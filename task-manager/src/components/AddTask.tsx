import React from "react";
import {  Form,  Input, Modal,  } from "antd";


interface AddTaskFormProps {
    openTask: boolean;
    onCreateTask: (values: TaskInfo) => void;
    onCancelTask: () => void;
    userId:string, 
  }

  interface TaskInfo {
    taskName: string;
    userId: string;
  }
  
  

const AddTaskForm: React.FC<AddTaskFormProps> = ({
    openTask,
    onCreateTask,
    onCancelTask,
    userId
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={openTask}
        title="Add a task for the selected user"
        okText="Add"
        cancelText="Cancel"
        onCancel={onCancelTask}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreateTask(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="task_form"
        >
          <Form.Item name="taskName" label="Task Name" rules= {[
               { required: true, message: 'Please input the task name' },
              {
                  pattern: /^[A-Za-z0-9\s_]+$/,
                  message: 'Task name should only contain letters, numbers,spaces and underscore',
              },
            ]}>
            <Input type="textarea" /> 
          </Form.Item>
          <Form.Item name="userId" initialValue={userId} noStyle>
          <Input style={{ display: 'none' }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }


  export default AddTaskForm; 