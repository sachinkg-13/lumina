import React, { useEffect, useState } from "react";
import authService from "../appwrite/config";
import { Container, PostCard, Skeleton } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    authService.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 w-full rounded-xl bg-card border"
                >
                  <Skeleton className="h-48 w-full rounded-xl mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (authStatus) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">
                Latest Posts
              </h1>
              <Link
                to="/all-posts"
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div key={post.$id} className="h-full">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-purple-700 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            >
              Share Your Stories with the World
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10"
            >
              A modern platform for writers, thinkers, and storytellers. Join
              our community and start your journey today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground bg-white border border-gray-200 dark:bg-secondary dark:border-transparent rounded-full hover:bg-gray-50 dark:hover:bg-secondary/80 transition-all shadow-sm hover:shadow-md"
              >
                Log In
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/30 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/30 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built with modern technologies for the best performance and user
                experience.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Editor</h3>
              <p className="text-muted-foreground">
                Express yourself with our powerful rich text editor supporting
                images and formatting.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with other writers and readers. Share ideas and grow
                your audience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
