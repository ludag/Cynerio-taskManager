import React, { useCallback, useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import AddUserTaskForm from "./AddUserTask";
import AddTaskForm from "./AddTask";
import { ADD_USER_TASK_ROUTE, CHECKIN_ROUTE, CHECKOUT_ROUTE, GET_TASK_ROUTE } from "../consts";
import { TaskInfo,UserTaskList  } from "../types/task.types";

interface UserTask {
  key: React.Key;
  userId: string;
  userName: string;
  activeTask: boolean;
  children?: Task[];
}

interface Task {
    key: React.Key;
    userId: string;
    taskId:string;
    taskName: string;
    startTime: string;
    endTime?:string;
    elapsedTime?: number;
}

interface NewUserTask {
  userName: string;
  taskName: string;
}




  

  const TaskList: React.FC = () => {
    const [openUserTask, setOpenUserTask] = useState(false);
    const [openTask, setOpenTask] = useState(false); 
    const [taskList, setTaskList] = useState<UserTask[]>([]);
    const [error, setError] = useState(''); 
    const [selectedRow, setSelectedRow] = useState('');

   
    const getTaskList = useCallback(async () => {

      try {
        setError('');
        const response = await fetch(GET_TASK_ROUTE);
        if (!response.ok){
          throw new Error(); 
        }
        const responseJson = await response.json();
        const displayData: UserTask[] = responseJson.map((userTasks:UserTaskList) => {
          return {
            key: userTasks.userId,
            userId: userTasks.userId,
            userName: userTasks.userName,
            activeTask: userTasks.activeTask,
            children: userTasks.children.map((child:TaskInfo) => {
              return {
                key: `${userTasks.userId}-${child.taskId}`,
                userId: child.userId,
                taskId: child.taskId,
                taskName: child.taskName,
                startTime: child.startTime,
                endTime: child.endTime,
                elapsedTime: child.endTime? Math.floor((new Date(child.endTime).getTime() - new Date(child.startTime).getTime())/(60 * 60 * 1000)):null,
              };
            }),
          };
        });

                
        setTaskList(displayData);
           
      } catch (error) {
        setError("An error occured loading the data , please try again later");
      }
    
       
    }, []);

    useEffect(() => {
      getTaskList();
    }, [checkout, checkin,getTaskList ]) ;

    

    async function checkin(task:Task) {

      try {
        setError('');
        const response = await fetch(CHECKIN_ROUTE, {
          method: `POST`, 
          body: JSON.stringify(task), 
          headers: {
            'Content-Type' : 'application/json', 
            'Access-Control-Allow-Origin': '*'
          }
        });

        if (!response.ok){
          throw new Error(); 
        }
        
      } catch (error) {
        setError("An error occured checkout a task , please try again later");
      }
    
       
    }


    async function addNewUserTask(task:NewUserTask) {

      try {
        setError('');
        const response = await fetch(ADD_USER_TASK_ROUTE, {
          method: `POST`, 
          body: JSON.stringify(task), 
          headers: {
            'Content-Type' : 'application/json', 
            'Access-Control-Allow-Origin': '*'
          }
        });

        if (!response.ok){
          throw new Error(); 
        }
        
      } catch (error) {
        setError("An error occured checkout a task , please try again later");
      }
    
       
    }

    async function checkout(userId:string) {

      try {
        setError('');
        const response = await fetch(CHECKOUT_ROUTE, {
          method: `POST`, 
          body: JSON.stringify({userId}), 
          headers: {
            'Content-Type' : 'application/json', 
            'Access-Control-Allow-Origin': '*'
          }
        });

        if (!response.ok){
          throw new Error(); 
        }
        
      } catch (error) {
        setError("An error occured checkout a task , please try again later");
      }
    
       
    }
  

    const onCreateUserTask = (values: any) => {
          addNewUserTask(values);
          setOpenUserTask(false);
    };

    const onCreateTask = (values: any) => {
        checkin(values); 
        setOpenTask(false);
  };
    
   const showNewTaskModal = (userId:string) => {
         setSelectedRow(userId);
         setOpenTask(true);
   };

   const checkoutTask = (userId:string) => {
         checkout(userId); 
};

   const showNewUserModal = () => {
          setOpenUserTask(true);
    };
    

        const columns: ColumnsType<UserTask> = [
            {

              title: "User Name",
              dataIndex: "userName",
              key: "userName",
              width: "20%"
            },
            {
              title: "Task Name",
              dataIndex: "taskName",
              key: "taskName",
              width: "50%"
            },
            {
              title: "Start Time",
              dataIndex: "startTime",
              key: "startTime",
              width: "10%"
            },
            {
              title: "End Time",
              dataIndex: "endTime",
              key: "endTime",
              width: "10%"
            },
            {
              title: "Elapsed Time",
              dataIndex: "elapsedTime",
              key: "elapsedTime",
              width: "5%"
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                record.activeTask ? 
                      <Space size="middle">
                        <Button type="primary" 
                           onClick={() => checkoutTask(record.userId)}>
                          Checkout</Button>
                       </Space> : record.activeTask===false?
                        <Space size="middle">
                        <Button type="primary" 
                          onClick={() => showNewTaskModal(record.userId)}>
                          Checkin</Button>
                       </Space>:
                        <Space size="middle">
                       </Space>
              
              )
            }
          ];


      return (
        <>
          <div> 
            <Space size="middle">
                <Button type="primary" onClick={showNewUserModal}>
                   Add new user and task</Button>
            </Space>
          </div>
           <Table columns={columns} dataSource={taskList}  />
          {!taskList && error&& <p> error </p>}
          <AddUserTaskForm
            openUserTask={openUserTask}
            onUserTaskCreate={onCreateUserTask}
            onUserTaskCancel={() => {
              setOpenUserTask(false);
            }}
          />
           <AddTaskForm
            openTask={openTask}
            onCreateTask={onCreateTask}
            userId={selectedRow}
            onCancelTask={() => {
              setOpenTask(false);
            }}
          />
        </>
      );
    };
    
    export default TaskList;

  
 