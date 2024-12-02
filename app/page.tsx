import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

import { client, urlFor } from "./lib/sanity";
import { blogCard } from "./lib/interface";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `*[_type=='blog'] | order(postedAt desc) {
   title, 
     image,
     body,
     postedAt, 
     "currentSlug": slug.current
}`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: blogCard[] = await getData();

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {data.map((card, idx) => (
          <Link href={`/blogs/${card.currentSlug}`} key={idx}>
            <Card className="flex flex-col w-full max-w-sm h-auto shadow-lg rounded-md">
              <CardHeader>
                <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-slate-500">
                  {" "}
                  {format(card.postedAt, "dd MMM yyyy")}
                </CardDescription>
              </CardHeader>
              <div className="flex justify-center px-4 py-4">
                <Image
                  src={urlFor(card.image).url()}
                  alt="image"
                  width={200}
                  height={100}
                  className="rounded"
                />
              </div>
              <CardContent>
                <CardDescription className="line-clamp-5">
                  {card.body}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-2"></CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
