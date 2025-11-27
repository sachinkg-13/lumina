import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appewriteService from "../appwrite/config";
import { Input, RTE, Select, Button, Container } from "../components/index";

export default function PostForm({ post }) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		getValues,
		reset,
	} = useForm({
		defaultValues: {
			titles: post?.titles || "",
			slug: post?.$id || "",
			content: post?.content || "",
			status: post?.status || "active",
		},
	});

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (post) {
			reset({
				titles: post.titles,
				slug: post.$id,
				content: post.content,
				status: post.status,
			});
		}
	}, [post, reset]);

	const submit = async (data) => {
		setIsLoading(true);
		try {
			let file = data.image[0]
				? await appewriteService.uploadFile(data.image[0])
				: null;
			if (post) {
				if (file) {
					await appewriteService.deleteFile(post.featuredImage);
				}
				const dbPost = await appewriteService.updatePost(post.$id, {
					featuredImage: file ? file.$id : undefined,
					...data,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			} else {
				file = await appewriteService.uploadFile(data.image[0]);
				if (file) {
					const dbPost = await appewriteService.createPost({
						...data,
						userID: userData.$id,
						featuredImage: file.$id,
					});
					if (dbPost) {
						navigate(`/post/${dbPost.$id}`);
					}
				}
			}
		} catch (error) {
			console.error("Error submitting form: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value.toLowerCase().replace(/[^a-zA-Z\d]+/g, "-");
		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "titles") {
				setValue("slug", slugTransform(value.titles), {
					shouldValidate: true,
				});
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);

	return (
		<>
			<form
				onSubmit={handleSubmit(submit)}
				className="flex flex-wrap text-blue-200 mt-2 relative pb-14">
				<div className="lg:w-2/5 md:w-1/2 w-full sm:pr-2 ">
					<div className="">
						<Input
							label="Title"
							placeholder="Title"
							className="sm:mb-4 mb-2 inline-block items-start"
							{...register("titles", {
								required: true,
							})}
						/>
					</div>
					<Input
						label="Featured Image"
						type="file"
						className="mb-4"
						accept="image/png, image/jpg, image/jpeg, image/gif"
						{...register("image", { required: !post })}
					/>
					{post && (
						<div className="w-full mb-4">
							<img
								src={appewriteService.getFilePreview(post.featuredImage)}
								alt={post.titles}
								className="rounded-lg"
							/>
						</div>
					)}
					<Select
						options={["active", "inactive"]}
						label="Status"
						className="mb-4 rounded-[4px]"
						{...register("status", { required: true })}
					/>
					<Button
						type="submit"
						bgColor={
							post ? "bg-green-500" : "bg-[#1e3a8a] hover:bg-[#1f409a]"
						}
						className="w-full absolute md:relative left-0 bottom-0 ">
						{post ? "Update" : "Submit"}
					</Button>
				</div>
				<div className="lg:w-3/5 md:w-1/2 w-full mt-3 sm:mt-0">
					<RTE
						label="Content"
						name="content"
						control={control}
						defaultValue={getValues("content")}
					/>{" "}
				</div>

				{/* <div className="absolute h-screen w-full z-10 m-0 p-0  flex justify-center items-center text-gray-100">
					<div className="loader"></div>
					<p className="ml-2">This may take a moment, please wait...</p>
				</div> */}
			</form>
			{isLoading && (
				<div className="fixed top-0 left-0 z-50 w-full cursor-progress h-full flex justify-center items-center bg-opacity-50 bg-gray-800">
					<div className="loader"></div>
					<p className="ml-2 text-gray-200">
						This may take a moment, please wait...
					</p>
				</div>
			)}
		</>
	);
}
