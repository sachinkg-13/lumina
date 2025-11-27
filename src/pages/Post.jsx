import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Skeleton } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { FaRegCircleStop } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Post() {
  const [post, setPost] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const toggleSpeak = ({ content }) => {
    if (isSpeaking) {
      setIsSpeaking(false);
      const utterance = new SpeechSynthesisUtterance(
        content || "Empty Text area."
      );

      utterance.onend = () => {
        setIsSpeaking(true);
      };

      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(true);
    }
  };

  if (!post) {
    return (
      <div className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Skeleton className="aspect-video w-full mb-8 rounded-xl" />
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-12 w-3/4 mb-4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const createdAt = new Date(post.$createdAt);
  const formattedDate = createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden shadow-2xl bg-muted flex items-center justify-center">
            {post.featuredImage ? (
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="hidden flex-col items-center justify-center text-muted-foreground p-4 text-center w-full h-full absolute inset-0 bg-muted"
              style={{ display: post.featuredImage ? "none" : "flex" }}
            >
              <Loader2 size={48} className="mb-2 opacity-50" />
              <span className="text-sm">Image not available</span>
            </div>

            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="secondary" className="gap-2">
                    <FaEdit /> Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <MdDelete /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this post?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={deletePost}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {new Date(post.$updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <button
                onClick={() => toggleSpeak(post)}
                className="text-primary hover:text-primary/80 transition-colors"
                title={isSpeaking ? "Listen to article" : "Stop listening"}
              >
                {isSpeaking ? (
                  <GiSpeaker size={24} />
                ) : (
                  <FaRegCircleStop size={24} />
                )}
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              {post.titles}
            </h1>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            {parse(post.content)}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
