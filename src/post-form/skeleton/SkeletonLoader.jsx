import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader() {
	return (
		<div className="skeleton-loader">
			<div className="skeleton-title"></div>
			<div className="skeleton-image"></div>
			<div className="skeleton-text"></div>
			<div className="skeleton-button"></div>
		</div>
	);
}

export default SkeletonLoader;
