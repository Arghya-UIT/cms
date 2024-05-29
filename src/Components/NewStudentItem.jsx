import React, { useEffect, useState } from 'react';
import './NewStudentItem.css'

const NewStudentItem = ({ student }) => {
  const [enrolled, setEnrolled] = useState(false);

  const enroll = async () => {
    try {
      const response = await fetch(`http://localhost:3000/profile/enrollStudent/${student.studentId}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')

        },
        body: JSON.stringify({ studentId: student.studentId }), 
      });

      if (!response.ok) {
        throw new Error('Failed to enroll student');
      }

    
      setEnrolled(true);
    } catch (error) {
      console.error('Error enrolling student:', error);
    }
  };


  return (
    <div className='newStudents-main'>
      <div className="fields">
        <p>Name: {student.name}</p>
        <p>Email: {student.email}</p>
        <p>Transaction Code: {student.transactionCode}</p>
      </div>
      {!enrolled && <div className="enroll-btn" onClick={enroll}>Enroll</div>}
      {enrolled && <p>Student Enrolled!</p>}
    </div>
  )
}

export default NewStudentItem