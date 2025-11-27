import React from "react";
import { Container, PostForm } from "../components/index";

function AddPost() {
	return (
		<div className="py-8 min-h-[calc(100vh-150px)] w-[80vw] mx-auto">
			<>
				<div className="sm:mb-10 mb-5 w-full">
					<span className="text-[#9ca3af] font-semibold text-3xl tracking-widest mx-auto">
						ADD POST{" "}
						{/* TO ADD GRADIENT TO THE TEXT :
          <div class="relative">
            <p class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-yellow-500 text-transparent">Your Text Here</p>
            <p class="relative text-gray-800">Your Text Here</p>
          </div> */}
					</span>
				</div>
				<PostForm />
			</>
		</div>
	);
}

export default AddPost;
