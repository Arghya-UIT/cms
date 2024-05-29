import React, { useState } from 'react';
import './CourseAssignment.css'
const CourseAssignment = ({ assignment }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const downloadAssignment = () => {
        const link = document.createElement('a');
        link.href = `http://localhost:3000/download/assignment/${assignment.assignmentFileName}`;
        link.download = assignment.assignmentName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('courseId', assignment.courseId);  // Ensure courseId is appended to the form data

        try {
            const response = await fetch(`http://localhost:3000/upload/${assignment.assignmentId}`, {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    return (
        <div className='asmitem'>
            <p>Assignment File: {assignment.assignmentName}</p>

            <button onClick={downloadAssignment}>Download Assignment</button>
            {!assignment.submitted ? (
                <>
                    {!assignment.checked ? (
                        <>
                            <div>
                                <input type="file" onChange={handleFileChange} />
                                <button onClick={handleFileUpload}>Submit Assignment</button>
                            </div>
                        </>
                    ) : <p>Marks:{assignment.marks}</p>
                    }
                </>
            ) : (
                <>
                    <div>Assignment Submitted</div>
                    {assignment.checked ? (
                        <p>Marks:{assignment.marks}</p>
                    ) : null}
                </>
            )}
        </div >
    );
}

export default CourseAssignment;
