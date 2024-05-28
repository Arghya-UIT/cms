import React, { useState, useContext } from 'react';
import './Singup.css'; // Import the CSS file
import { AuthContext } from '../AuthProvider';



const Signup = () => {

	const [changeform, setChangeform] = useState(false);
	const [formData, setFormData] = useState({
		role: '',
		name: '',
		email: '',
		dob: '',
		address: '',
		password: '',
		qualification: '',
		courseName: '',
		courseDescription: '',
		coursePrice: '',
		upiId: '',
		demoVideoUrl: ''
	});
	const { login } = useContext(AuthContext);
	const handleFileChange = (event) => {
		const { name, files } = event.target;
		const file = files[0];

		if (file.size <= 2 * 1024 * 1024) {
			setFormData({
				...formData,
				coverPhoto: file
			});
		} else {
			alert('File size should be less than 2MB');
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
		if (name === 'role' && value === 'teacher') {
			// console.log("got teacher");
			setChangeform(true)

		}
		else if (name === 'role' && value === 'student') {
			// console.log("got student");
			setChangeform(false)
		}
		console.log(changeform);

	};

	const validateForm = () => {
		const mandatoryFields = ['role', 'name', 'email', 'dob', 'address', 'password'];
		if (formData.role === 'teacher') {
			mandatoryFields.push('qualification', 'courseName', 'courseDescription', 'coursePrice', 'upiId', 'demoVideoUrl');
		}

		for (let field of mandatoryFields) {
			if (!formData[field]) {
				alert(`${field} is required`);
				return false;
			}
		}
		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateForm()) {
			console.log(JSON.stringify(formData));
			try {
				let endpoint = 'http://localhost:3000/signup/student';
				if (formData.role !== 'student') {
					// If role is not student, change the endpoint
					endpoint = 'http://localhost:3000/signup/teacher'; // Or whatever endpoint you need for other roles
				}
				console.log(formData);
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});
				const data = await response.json();
				alert(data.msg);
				if (response.ok) {
					localStorage.setItem('token', data.token);
					localStorage.setItem('isAuthenticated', 'true');

					// login({ id: data.user.id, email: data.user.email });



				} else {

					console.log(data); // Log response data
					alert('Registration failed');
				}
			} catch (error) {
				console.error('Error:', error.message);
				alert('Registration failed');
			}
			window.location.reload();

		}
	};

	return (
		<div className="main">
			<div className="signup-title">
				Sign Up
			</div>

			<form onSubmit={handleSubmit} className='singup-details'>
				<div className="role">
					<select name="role" value={formData.role} onChange={handleChange}>
						<option value="" disabled>Select your role</option>
						<option value="student">Student</option>
						<option value="teacher">Teacher</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter your name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Enter your email"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="dob">Date of Birth:</label>
					<input
						type="date"
						id="dob"
						name="dob"
						value={formData.dob}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="address">Address:</label>
					<input
						type="text"
						id="address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder="Enter your address"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Enter your password"
					/>
				</div>
				{changeform === true ? (
					<div>
						<div className="form-group">
							<label htmlFor="qualification">Qualification</label>
							<input
								type="text"
								id="qualification"
								name="qualification"
								value={formData.qualification}
								onChange={handleChange}
								placeholder="Qualification"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="course-name">Course Name:</label>
							<input
								type="text"
								id="course-name"
								name="courseName"
								value={formData.courseName}
								onChange={handleChange}
								placeholder="Enter course name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="course-description">Course Description:</label>
							<textarea
								id="course-description"
								name="courseDescription"
								value={formData.courseDescription}
								onChange={handleChange}
								placeholder="Enter course description"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="course-price">Course Price:</label>
							<input
								type="number"
								id="course-price"
								name="coursePrice"
								value={formData.coursePrice}
								onChange={handleChange}
								placeholder="Enter course price"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="upi-id">Upi Id:</label>
							<input
								type="text"
								id="upi-id"
								name="upiId"
								value={formData.upiId}
								onChange={handleChange}
								placeholder="Enter Upi Id"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="demo-video">Demo Video: (Upload in some public platform (YouTube) and put the link here)</label>
							<input
								type="text"
								id="demo-video"
								name="demoVideoUrl"
								value={formData.demoVideoUrl}
								onChange={handleChange}
								placeholder="Enter demo video url"
							/>
						</div>

					</div>
				) : null}


				<button type="submit" className='sungup-submit'>Sign Up</button>
			</form>

		</div>
	);
};

export default Signup;
