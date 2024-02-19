import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegFolder, FaRegUserCircle } from "react-icons/fa/index.js";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosMusicalNote } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface artist_data {
  id: String,
  name: String,
  profileImg: String,
  userName: String,
  govId: String,
  email: String,
}

interface tier_data {
  id: String,
  name: String,
  capacity: number,
  price: number,
}

interface event_data {
  id: String,
  name: String,
  description: String,
  dateAndTime: String,
  eventDuration: String,
  venueId: String,
  transactionId: String,
  categoryList: String[],
  imageUrls: String[],
  artists: artist_data[],
  tiers: tier_data[],
}

const EventCard = ({ data }: { data: event_data }) => {
  const { summary_length, blog_folder } = config.event_settings;
  //const { title, image, author, categories, date } = data.frontmatter;

  const getFormattedDate = (dateAndTime: String) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = dateAndTime.split(" ")[0];
    const timestamp = Date.parse(date);
    const date_obj = new Date(timestamp);
    return `${days[date_obj.getDay()]}, ${date_obj.getDate()} ${months[date_obj.getMonth()]}`;
  }

  return (
    <div className="bg-body dark:bg-darkmode-body transform transition duration-300 hover:scale-105">
      <Link href={`/event/${data.id}`}>
        <ImageFallback
          className="mb-6 w-full h-80 object-cover rounded"
          src={data.imageUrls[0]}
          alt={data.name}
          width={445}
          height={230}
        />
        <h4 className="line-clamp-2 mb-3">
          {data.name}
        </h4>
      </Link>
      <ul className="mb-4 flex flex-col">
        {/*<li className="mr-4 inline-block">
          <Link href={`/authors/${slugify(author)}`}>
            <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
            {humanize(author)}
          </Link>
        </li>
        <li className="mr-4 inline-block">
          <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
          {categories?.map((category: string, index: number) => (
            <Link key={index} href={`/categories/${slugify(category)}`}>
              {humanize(category)}
              {index !== categories.length - 1 && ", "}
            </Link>
          ))}
        </li>*/}
        {/*{date && <li className="inline-block">{dateFormat(date)}</li>}*/}
        <li className="flex items-center gap-2">
          <CiCalendarDate size={20} />
          <li className="mt-1">{getFormattedDate(data.dateAndTime)}</li>
        </li>
        <li className="flex items-center gap-2 ">
          <IoIosMusicalNote size={20} />
          <div className="flex flex-wrap gap-1">
            {data.categoryList.map((category, index) =>
              index == data.categoryList.length-1 ?
                <li key={index} className="mt-1">{category}</li> :
                <li key={index} className="mt-1">{category},</li>
            )}
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <FaIndianRupeeSign size={16} />
          <li className="mt-1">{data.tiers.reduce((prev, curr) => prev.price < curr.price ? prev : curr).price} onwards</li>
        </li>
      </ul>
      {/*<p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>*/}
      {/*<Link
        className="btn btn-outline-primary btn-sm"
        href={`/${blog_folder}/${data.slug}`}
      >
        read more
      </Link>*/}
    </div>
  );
};

export default EventCard;
