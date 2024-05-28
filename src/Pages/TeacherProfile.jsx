import React, { useEffect, useState } from 'react';
import NewStudentItem from '../Components/NewStudentItem';
import CheckAssignmentItem from '../Components/CheckAssignmentItem';

const TeacherProfile = ({ profileData }) => {
    const course_id = profileData.course_id;
    const [newStudents, setNewStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    useEffect(() => {
        const fetchNewStudentsData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profile/teacher/course_id/${course_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setNewStudents(data.students); // Update to access students array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };

        fetchNewStudentsData();
    }, [course_id]);

    // Log newStudents inside useEffect to see the updated value
    useEffect(() => {
        console.log("newstudents ", newStudents);
    }, [newStudents]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setUploadMessage('');
        } else {
            setFile(null);
            setUploadMessage('Please upload a PDF file.');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadMessage('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/assignment/question', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to upload file');
            }

            const data = await response.json();
            setUploadMessage(data.msg || 'File uploaded successfully!');
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage(error.message || 'Error uploading file. Please try again.');
        }
    };
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/assignment/${course_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch assignments');
                }

                const data = await response.json();
                setAssignments(data.assignments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching assignments:', error);
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [course_id]);
    console.log("assignments for teacher ", assignments);
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Welcome, {profileData.name}</h1>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Date of Birth:</strong> {profileData.dob}</p>
            <p><strong>Address:</strong> {profileData.address}</p>
            <p><strong>Qualification:</strong> {profileData.qualification}</p>
            <p><strong>Course Name:</strong> {profileData.courseName}</p>
            <p><strong>Course Description:</strong> {profileData.courseDescription}</p>
            <p><strong>Course Price:</strong> {profileData.coursePrice}</p>
            <p><strong>Demo Video URL:</strong> {profileData.demoVideoUrl}</p>
            <br />
            <h1>New Students</h1>

            {newStudents.length > 0 ? (
                newStudents.map((student, index) => (
                    <NewStudentItem key={index} student={student} />
                ))
            ) : (
                <div>No new students found.</div>
            )}

            <h1>Upload Assignments</h1>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadMessage && <p>{uploadMessage}</p>}

            <h1>check asingments</h1>
            {assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                    <CheckAssignmentItem key={index} assignment={assignment} />
                ))
            ) : (
                <div>No assignments found.</div>
            )}

        </div>
    );
};

export default TeacherProfile;
