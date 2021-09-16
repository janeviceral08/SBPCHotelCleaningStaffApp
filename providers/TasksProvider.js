import React, { useContext, useState, useEffect, useRef } from "react";
import {Alert} from 'react-native';
import Realm from "realm";
import { Room_checklist, Logs } from "../schemas";
import { useAuth } from "./AuthProvider";
import moment from "moment";
import Toast from "react-native-simple-toast";
import addNotif from '../views/push/addNotif';


const TasksContext = React.createContext(null);

const TasksProvider = ({ children, projectPartition, expiration }) => {
  const [tasks, setTasks] = useState([]);
  const { user, userData } = useAuth();
  const [rooms, setRooms] = useState([]);

  const realmRef = useRef(null);

  useEffect(() => {

  
    const config = {
      sync: {
        user: user,
        partitionValue: projectPartition,
      },
    };
    // open a realm for this particular project

    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;
      projectRealm.write(() => {

        projectRealm.create(
          "logs",
          new Logs({
            staff: userData.name,
            description:  'User Login',
           date: moment().unix(),
            partition: projectPartition,
          })
        );
      })


      const syncTasks = projectRealm.objects("Task");
      let sortedTasks = syncTasks.sorted("name");
      setTasks([...sortedTasks]);
      sortedTasks.addListener(() => {
        setTasks([...sortedTasks]);
      });


      const syncRoom = projectRealm.objects("Rooms");
      let sortedRoom = syncRoom.sorted("name");
      setRooms([...sortedRoom]);
      console.log('sortedRoom: ', sortedRoom)
      sortedRoom.addListener(() => {
        setRooms([...sortedRoom]);
      });

    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
        setRooms([]);
       
      }
    };
  }, [user, projectPartition]);

  const Room_checklist_add = (roomInfo, newRoomNumber,selectedItems) => {
    const projectRealm = realmRef.current;
  
  
    projectRealm.write(() => {
      roomInfo.status = 'Available';
      roomInfo.note = newRoomNumber;
      projectRealm.create(
        "room_checklist",
        new Room_checklist({
          staff: userData.name,
          room_id: roomInfo.room_id,
          note: newRoomNumber,
          status: "Available",
          checkListPros:selectedItems,
          checkList: roomInfo.checkList,  
          date: moment().unix(),
          partition: projectPartition,
        })
      );
  
      projectRealm.create(
        "logs",
        new Logs({
          staff: userData.name,
          description:  'Cleaned Room No '+ roomInfo.name, 
         date: moment().unix(),
          partition: projectPartition,
        })
      );
    });
 
  };
  const Room_checklist_maintain = (roomInfo, newRoomNumber,selectedItems) => {
    const projectRealm = realmRef.current;
  
  
    projectRealm.write(() => {
      roomInfo.status = 'Under Maintenance';
      roomInfo.note = newRoomNumber;
      projectRealm.create(
        "room_checklist",
        new Room_checklist({
          staff: userData.name,
          room_id: roomInfo.room_id,
          note: newRoomNumber,
          status: "Available",
          checkListPros:selectedItems,
          checkList: roomInfo.checkList,  
          date: moment().unix(),
          partition: projectPartition,
        })
      );
  
      projectRealm.create(
        "logs",
        new Logs({
          staff: userData.name,
          description:  'Under Maintenance Room No '+ roomInfo.name, 
         date: moment().unix(),
          partition: projectPartition,
        })
      );
    });
 
  };

 const cleaned =(item)=> {

  const projectRealm = realmRef.current;
  projectRealm.write(() => {

    item.status = 'Available';
  });
  Alert.alert('Success!')
}

const maintain =(item)=> {

  const projectRealm = realmRef.current;
  projectRealm.write(() => {
    item.status = 'Under Maintenance';
   
  });
  Alert.alert('Success!')
}






  return (
    <TasksContext.Provider
      value={{
          cleaned,
          maintain,
          Room_checklist_add,
          Room_checklist_maintain,
        tasks,
        rooms,
      
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export { TasksProvider, useTasks,  };
