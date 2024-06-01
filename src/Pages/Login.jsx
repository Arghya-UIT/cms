import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider';


const Login = () => {
	const [emailId, setemailId] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});


	};
	const validateForm = () => {
		const mandatoryFields = ['email', 'password'];


		for (let field of mandatoryFields) {
			if (!formData[field]) {
				alert(`${field} is required`);
				return false;
			}
		}
		return true;
	};


	const handleLogin = async(event) => {
		event.preventDefault();
		// For demonstration, we just log the credentials
		// In a real app, you would send these to the server for authentication
		if (emailId === 'admin' && password === 'password') {
			setMessage('Login successful!');
		} else {
			setMessage('Login failed. Please check your emailId and password.');
		}
		if (validateForm()) {
			console.log(JSON.stringify(formData));
			try {
				let endpoint = 'http://localhost:3000/login';
				
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
					alert('Login failed');
				}
			} catch (error) {
				console.error('Error:', error.message);
				alert('Login failed');
			}
			window.location.reload();

		}
	};

	return (
		<div className="main">
			<div className="login-title">
				Login
			</div>

			<form onSubmit={handleLogin} className='login-details'>


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
				{/* <div className="forgot">
					<Link to="/forgot-password">Forgot password?</Link>
				</div> */}
				<div className="new-user">
					<Link to="/signup">New user? Sign up here</Link>
				</div>

				<button type="submit" className='sungup-submit'>Login</button>
			</form>

		</div>
	);
};

export default Login;
