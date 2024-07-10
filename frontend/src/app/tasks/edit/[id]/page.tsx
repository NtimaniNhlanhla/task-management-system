import React from 'react';
import EditTaskForm from '../../../../components/Task/EditTaskForm';


const EditTaskPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-4">Edit Task</h2>
      <EditTaskForm />
    </div>
  );
};

export default EditTaskPage;
