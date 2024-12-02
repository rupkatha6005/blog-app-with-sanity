import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";

async function getData(slug: string) {
  const query = `*[_type == "blog" &&  slug.current =='${slug}'] {
  "currentSlug" : slug.current,
  title, image, body, postedAt
}[0]`;
  const data = await client.fetch(query);
  return data;
}
export default async function blog({ params }: { params: { slug: string } }) {
  const data: fullBlog = await getData(params.slug);
  return (
    <div className="container mx-auto px-16 py-8">
      {/* Title Section */}
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {data.title}
      </h1>

      {/* Image Section */}
      <div className="flex justify-center px-4 py-4">
        <Image
          src={urlFor(data.image).url()}
          alt="image"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Body Section */}
      <p className="text-xl text-muted-foreground py-10">{data.body}</p>
    </div>
  );
}
