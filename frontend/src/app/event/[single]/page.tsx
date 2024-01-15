import BlogCard from "@/components/BlogCard";
import Disqus from "@/components/Disqus";
import Share from "@/components/Share";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import similerItems from "@/lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { EventPost } from "@/types";
import Link from "next/link";
import {
  FaRegClock,
  FaRegFolder,
  FaRegUserCircle,
} from "react-icons/fa/index.js"
import Image from "next/image";

const { blog_folder } = config.event_settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: EventPost[] = getSinglePage(blog_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const EventSingle = ({ params }: { params: { single: string } }) => {
  const posts: EventPost[] = getSinglePage(blog_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    about,
    cast,
    artists,
    meta_title,
    description,
    image,
    image2,
    star_icon,
    author,
    categories,
    date,
    tags,
  } = frontmatter;
  const similarPosts = similerItems(post, posts, post.slug!);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />


      {/* , backgroundColor:"rgb(26, 26, 26)" */}

      <section>
        <div className="container">
        <div className="row justify-center">
          <article className="">
            <div className="hidden lg:contents md:contents" style={{ color: "rgb(255, 255, 255)" }}>
              <div className="flex items-center justify-center m-0 w-full " style={{backgroundColor:"rgb(26,26,26)"}}>
                <div className="h-[490px] overflow-hidden w-[1100px] bg-[url('/images/image-placeholder.png')]
                          bg-no-repeat bg-cover flex items-center p-6">


                  <div className="flex items-start justify-between w-full">

                    <div className="flex gap-8">
                      <div className="w-[261px] h-[416px] rounded overflow-hidden object-cover">
                      <ImageFallback
                        height={200}
                        width={300}
                        src={image2}
                        alt="event-image"
                        className="object-cover w-full h-full"
                      />
                      </div>



                      <div className="flex flex-col gap-6 justify-center">

                        <p className="text-3xl font-bold">Event Name Lorem ipsum</p>

                        <button className="rounded">
                          <div className="flex items-center gap-2">

                            <Image
                              height={32}
                              width={32}
                              src={star_icon}
                              alt="star_icon"
                            />

                            <p className="text-xl font-bold">7.8/10</p>
                            <span >12.8K Votes</span>
                            <svg className="h-4 w-4 fill-current rotate-[270deg]" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </button>

                        <div className="bg-opacity-70 rounded py-4" style={{ backgroundColor: "#333" }}>
                          <div className="flex items-center justify-between px-4">
                            <div className="flex items-start flex-col">
                              <p className="text-xl font-bold text-white">Add your rating & review</p>
                              <p style={{ color: "rgb(204, 204, 204)" }}>Your ratings matter</p>
                            </div>
                            <Link href={'#'} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                              Rate Now
                            </Link>
                          </div>
                        </div>

                        <ul className="list-disc list-inside flex items-center gap-4 flex-wrap">
                          <li>{date && dateFormat(date)}</li>
                          <li>time_duration</li>
                          <li>event_category</li>
                        </ul>


                        <div>
                          <Link href={'#'} className="btn btn-primary">
                            Book Tickets
                          </Link>
                        </div>
                      </div>
                    </div>


                    <div className="hidden lg:contents">
                      <div className="btn btn-outline-primary h-fit flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                        share
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="px-4">
              <div className="lg:hidden md:hidden">


                <ImageFallback
                  height={500}
                  width={1200}
                  src={image2}
                  alt="event-image"
                  className="object-cover rounded"
                />



                <div className="flex flex-col gap-4 mt-[16px]">
                  <p className="text-3xl font-bold">Event Name Lorem ipsum</p>

                  <button className="rounded">
                    <div className="flex items-center gap-2">

                      <Image
                        height={32}
                        width={32}
                        src={star_icon}
                        alt="star_icon"
                      />

                      <p className="text-xl font-bold">7.8/10</p>
                      <span >12.8K Votes</span>
                      <svg className="h-4 w-4 fill-current rotate-[270deg]" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </button>

                  {/* <div className="bg-opacity-70 rounded py-4" style={{ backgroundColor: "#333" }}>
                    <div className="flex items-center justify-between px-4">
                      <div className="flex items-start flex-col">
                        <p className="text-xl font-bold text-white">Add your rating & review</p>
                        <p style={{ color: "rgb(204, 204, 204)" }}>Your ratings matter</p>
                      </div>
                      <Link href={'#'} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Rate Now
                      </Link>
                    </div>
                  </div> */}

                  <ul className="list-disc list-inside flex flex-col items-start">
                    <li>{date && dateFormat(date)}</li>
                    <li>time_duration</li>
                    <li>event_category</li>
                  </ul>


                  <div> 
                    <Link href={'#'} className="btn btn-primary w-full text-center">
                      Book Tickets
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-[16px] m-1">
                <h1
                  dangerouslySetInnerHTML={markdownify(about)}
                  className="h2 mb-4"
                />
                {/* <ul className="mb-4">
                <li className="mr-4 inline-block">
                  <Link href={`/authors/${slugify(author)}`}>
                    <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
                    {humanize(author)}
                  </Link>
                </li>
                <li className="mr-4 inline-block">
                  <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
                  {categories?.map((category: string, index: number) => (
                    <Link
                      key={category}
                      href={`/categories/${slugify(category)}`}
                    >
                      {humanize(category)}
                      {index !== categories.length - 1 && ", "}
                    </Link>
                  ))}
                </li>
                {date && (
                  <li className="mr-4 inline-block">
                    <FaRegClock className="-mt-1 mr-2 inline-block" />
                    {dateFormat(date)}
                  </li>
                )}
              </ul> */}
                <div className="content mb-10">
                  <MDXContent content={content} />
                </div>
                {/* <div className="row items-start justify-between">
                <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                  <h5 className="mr-3">Tags :</h5>
                  <ul>
                    {tags?.map((tag: string) => (
                      <li key={tag} className="inline-block">
                        <Link
                          className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white dark:bg-darkmode-theme-light dark:hover:bg-darkmode-primary dark:hover:text-dark"
                          href={`/tags/${slugify(tag)}`}
                        >
                          {humanize(tag)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center lg:col-4">
                  <h5 className="mr-3">Share :</h5>
                  <Share
                    className="social-icons"
                    title={title}
                    description={description}
                    slug={post.slug!}
                  />
                </div>
              </div> */}
                <div>
                  <h2
                    dangerouslySetInnerHTML={markdownify(cast)}
                    className="h3" />
                  <div className="flex items-center gap-6">
                    {
                      artists.map((artist) => (

                        <div key={artist} className="flex flex-col items-center my-3">
                          <div className="w-32 h-32 overflow-hidden rounded-full">
                            <ImageFallback
                              height={100}
                              width={100}
                              src={image2}
                              alt={title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="font-semibold">{artist}</span>
                        </div>

                      ))
                    }
                  </div>
                </div>
                {/* <Disqus className="mt-20" /> */}

              </div>

              {/* <!-- Related posts --> */}
              <div className="pb-0">
                <h2 className="h3 mb-12 text-center">Related Posts</h2>
                <div className="row justify-center">
                  {similarPosts.map((post) => (
                    <div key={post.slug} className="lg:col-4 mb-7">
                      <BlogCard data={post} />
                    </div>
                  ))}
                </div>
              </div>

             
            </div>
          </article>
   
        </div>
        </div>
      </section >
    </>
  );
};

export default EventSingle;
