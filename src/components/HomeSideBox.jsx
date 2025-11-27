import React from "react";
import authService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "@/store/authSlice";

const stripHtmlTags = (str) => {
	if (!str) return "";
	return str.replace(/<\/?[^>]+(>|$)/g, "");
};
function HomeSideBox({ post }) {
	const Login = useSelector((state) => state.auth.status);
	const sanitizedContent = stripHtmlTags(post?.content);
	return (
		// <Link to={`${Login ? "/post/${posts[0]?.$id}" : "/login"}`}>
		<Link to={`/post/${post?.$id}`}>
			<div className="flex h-1/3 w-full bg-red-00 p-3">
				<img
					src={authService.getFilePreview(post?.featuredImage)}
					alt={post?.titles}
					className="rounded-tl-[8px] rounded-bl-[8px] rounded-b-lg h-[110%] s:h-full w-[45%] rounded-sm object-cover hover:brightness-110"
				/>
				<div className="text-left w-[55%] ml-4 my-auto">
					<button
						className={`flex items-center
                                ${
																	post?.status !== "active"
																		? "bg-red-50"
																		: " bg-[#f0fdf4] "
																}
                                mb-2 px-1.5 py-[1.5px] rounded-full md:text-xs lg:text-sm lg:px-2 lg:py-1 text-black text-left cursor-default`}>
						<div
							className={`${
								post?.status !== "active" ? "bg-red-400" : "bg-green-400"
							} mr-1  rounded-full h-2 w-2 `}></div>
						{post?.status}
					</button>
					<h2 className="md:text-xl lg:text-2xl text-md tracking-wider font-semibold text-gray-100 s:mb-2 mb-1 truncate">
						{post?.titles}
					</h2>
					<h4 className="md:text-xs lg:text-sm text-xs text-[#909090] tracking-tight s:pb-4 pb-1 truncate">
						{sanitizedContent}
					</h4>
					<div className="flex items-center text-gray-400/80 mt">
						<div className="s:w-[40px] s:h-[40px] w-[27px] h-[27px] rounded-full border-2 border-white bg-gray-400"></div>
						<div className="block pl-2 leading-3">
							<span className="text-xs">Sachin kumar</span>
							<br />
							<span className="text-[0.5rem]">29 may 2022</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default HomeSideBox;
