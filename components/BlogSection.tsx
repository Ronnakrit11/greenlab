"use client";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { formatInTimeZone } from 'date-fns-tz';

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: string;
  author: string;
  publishedAt: string;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const query = `*[_type == "blog"] | order(publishedAt desc)[0...3]`;
        const data = await client.fetch(query);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
        <p className="text-muted-foreground">Stay updated with our latest articles and insights</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href={`/blog/${blog.slug.current}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary">{blog.author}</span>
                  <span className="text-muted-foreground">
                    {formatInTimeZone(new Date(blog.publishedAt), 'Asia/Bangkok', 'dd MMM yyyy')}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;