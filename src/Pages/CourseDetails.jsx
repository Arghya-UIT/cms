import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css'

function CourseDetails() {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transactionCode, setTransactionCode] = useState('');
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     // Fetch course details from the backend based on the ID
    //     fetch(`/api/courses/${id}`)
    //         .then(response => response.json())
    //         .then(data => setCourseDetails(data))
    //         .catch(error => console.error('Error fetching course details:', error));
    // }, [id]);
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/course-details/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }
                const data = await response.json();
                setCourseDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);


    const handleBuyCourseClick = () => {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
            alert('You must be logged in to buy this course.');
            // navigate('/login');
            return;
        }
        setShowTransactionForm(true);
    };
    const handleTransactionCodeChange = (e) => {
        setTransactionCode(e.target.value);
    };

    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/course-details/${id}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                },
                body: JSON.stringify({ transactionCode })
            });
            if (!response.ok) {
                throw new Error('Failed to submit transaction code');
            }
            const data = await response.json();
            setMessage('Transaction successful! Thank you for your purchase.');
            setShowTransactionForm(false);
        } catch (error) {
            console.error('Error submitting transaction code:', error);
            setMessage('Transaction failed. Please try again.');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {/* Render fetched course details here */}
            {courseDetails && (
                <div className='course-details-main'> 
                    <h2>Course Name: {courseDetails.courseName}</h2>
                    <h3>Teacher: {courseDetails.name}</h3>
                    <p>Qualification: {courseDetails.qualification}</p>
                    <p>Description: {courseDetails.courseDescription}</p>
                    <p>Price: {courseDetails.coursePrice}</p>
                    <a href={courseDetails.demoVideoUrl} target="_blank" rel="noopener noreferrer">
                        Watch Demo Video
                    </a>
                    <button onClick={handleBuyCourseClick}>Buy Course</button>
                    {showTransactionForm && (
                        <div>
                            <p>UPI ID: {courseDetails.upiId}</p>
                            <form onSubmit={handleTransactionSubmit}>
                                <label>
                                    Transaction Code:
                                    <input type="text" value={transactionCode} onChange={handleTransactionCodeChange} required />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    )}
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
}

export default CourseDetails;
