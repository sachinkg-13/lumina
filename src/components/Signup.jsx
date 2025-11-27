import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const create = async (data) => {
		setError("");
		setIsLoading(true);
		try {
			const userData = await authService.createAccount(data);
			if (userData) {
				const data = await authService.getUserInfo(userData.userId);
				if (data) dispatch(login(data));
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md bg-card border border-white/10 rounded-xl p-8 shadow-xl backdrop-blur-sm"
			>
				<div className="mb-6 flex justify-center">
					<span className="inline-block w-24">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight mb-2">
					Sign up to create account
				</h2>
				<p className="text-center text-sm text-muted-foreground mb-8">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary hover:underline transition-all"
					>
						Sign in
					</Link>
				</p>
				{error && (
					<motion.p 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-destructive text-center mb-4 text-sm"
					>
						{error}
					</motion.p>
				)}
				<form onSubmit={handleSubmit(create)} className="space-y-6">
					<div className="space-y-4">
						<Input
							label="Full name"
							placeholder="Enter your full name"
							{...register("name", {
								required: true,
							})}
						/>
						<Input
							label="Email"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPattern: (value) =>
										/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
										"Email address should be a valid email address",
								},
							})}
						/>
						<Input
							label="Password"
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="flex items-center justify-center gap-2">
								<Loader2 className="animate-spin" size={20} />
								<span>Creating Account...</span>
							</div>
						) : (
							"Create Account"
						)}
					</Button>
				</form>
			</motion.div>
		</div>
	);
}

export default Signup;
