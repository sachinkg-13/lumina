import React from "react";
import { Link } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start space-x-2 mb-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Lumina
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Lumina. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Developed by Sachin
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sachinkumar-1309"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaGithubSquare size={24} />
            </a>
            <a
              href="http://www.linkedin.com/in/sachin-kumar-gupta-1309-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://x.com/sachinkg1309"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaSquareXTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
