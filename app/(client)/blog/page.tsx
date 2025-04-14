import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";

async function getBlogs() {
  try {
    const query = `*[_type == "blog"] | order(publishedAt desc)`;
    const blogs = await client.fetch(query);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <Container className="py-10">
      <h1 className="text-4xl font-bold text-center mb-4">Our Blog</h1>
      <p className="text-muted-foreground text-center mb-12">
        Discover our latest articles and insights
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog: any) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug.current}`}
            className="group"
          >
            <article className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary">{blog.author}</span>
                  <time className="text-muted-foreground">
                    {formatInTimeZone(
                      new Date(blog.publishedAt),
                      "Asia/Bangkok",
                      "dd MMM yyyy"
                    )}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </Container>
  );
}