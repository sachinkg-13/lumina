import React, { useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

function PostCard({ $id, titles, featuredImage, content, status }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = featuredImage ? service.getFilePreview(featuredImage) : null;

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
          {!imageError && imageUrl ? (
            <img
              src={imageUrl}
              alt={titles}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
              <ImageOff size={32} className="mb-2 opacity-50" />
              <span className="text-xs">Image not available</span>
            </div>
          )}

          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                status === "active"
                  ? "bg-green-500/20 text-green-500 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-3 line-clamp-2 text-card-foreground group-hover:text-primary transition-colors">
            {titles}
          </h2>
          <div className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
            {parse(content)}
          </div>
          <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
            <span>Read more</span>
            <span>→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default PostCard;
