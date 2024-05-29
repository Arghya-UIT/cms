import React, { useState } from 'react';
import './CheckAssignmenItem.css'

const CheckAssignmentItem = ({ index, assignment }) => {
    const [tasks, setTasks] = useState(assignment.tasks);

    const downloadAssignment = (file_name) => {
        const link = document.createElement('a');
        link.href = `http://localhost:3000/download/submission/${assignment.course_id}/${assignment._id}/${file_name}`;
        link.download = `submission_${file_name}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleMarksChange = (taskIndex, value) => {
        const updatedTasks = tasks.map((task, i) => (
            i === taskIndex ? { ...task, marks: value } : task
        ));
        setTasks(updatedTasks);
    };

    const handleCheckedChange = (taskIndex, checked) => {
        const updatedTasks = tasks.map((task, i) => (
            i === taskIndex ? { ...task, checked } : task
        ));
        setTasks(updatedTasks);
    };

    const saveChanges = async (taskIndex, taskId) => {
        const task = tasks[taskIndex];
        try {
            const response = await fetch(`http://localhost:3000/download/update-task/${assignment._id}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ marks: task.marks })
            });
            if (response.ok) {
                alert('Task updated successfully');
            } else {
                alert('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div key={index} className='check-assignment'>
            <h3>Assignment Name: {assignment.assignment_name}</h3>

            {tasks.map((task, taskIndex) => (

                <div key={taskIndex} >
                    {task.submission_id !== "" ? (
                        <div className='assignment-item'>
                            <p>Student Name: {task.student_name}</p>
                            <p>Student Email: {task.student_email}</p>
                            <p>Marks: {task.marks}</p>
                            {!task.checked ? (
                                <div>
                                    <button onClick={() => downloadAssignment(task.file_name)}>Download</button>
                                    <p>
                                        Marks:
                                        <input
                                            type="number"
                                            value={task.marks !== undefined ? task.marks : ''}
                                            onChange={(e) => handleMarksChange(taskIndex, Number(e.target.value))}
                                        />
                                    </p>
                                    <button onClick={() => saveChanges(taskIndex, task.student_id)}>Save</button>
                                </div>
                            ) : null}

                        </div>
                    ) : null}


                </div>
            ))}

        </div>
    );
};

export default CheckAssignmentItem;
