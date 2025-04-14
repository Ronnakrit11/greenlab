import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || " "}
            fill
            className="object-contain"
          />
          {value.caption && (
            <div className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold mt-6 mb-4">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
    normal: ({children}: any) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({children, value}: any) => {
      return (
        <a 
          href={value?.href} 
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
};

async function getBlogBySlug(slug: string) {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0]`;
    const blog = await client.fetch(query, { slug });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <Container className="py-10">
      <article className="max-w-3xl mx-auto">
        <div className="relative h-[400px] w-full mb-8">
          <Image
            src={urlFor(blog.mainImage).url()}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <span>{blog.author}</span>
          <span>•</span>
          <time>
            {formatInTimeZone(
              new Date(blog.publishedAt),
              "Asia/Bangkok",
              "dd MMMM yyyy"
            )}
          </time>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={blog.body} components={components} />
        </div>
      </article>
    </Container>
  );
}