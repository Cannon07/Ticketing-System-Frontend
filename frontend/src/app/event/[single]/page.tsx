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
import EventPostPage from "@/components/EventPostPage";

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

            <EventPostPage similarPosts={similarPosts}/>
   
        </div>
        </div>
      </section >
    </>
  );
};

export default EventSingle;
