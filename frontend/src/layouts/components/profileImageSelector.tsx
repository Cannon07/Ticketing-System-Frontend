import { LuUpload } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

interface ImageProps {
  title: string
}

export const ProfileImageSelector: React.FC<ImageProps> = ({ title }) => {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("Upload Image");

  return (
    <div className="">
      <label className='form-label-profile'>
        {title}
      </label>
      <div className="flex flex-col gap-4 w-[200px] pt-1">
        <div className="flex dark:border-gray-600 border-gray-300 border-2 rounded border-dashed min-h-[100px] relative">
          {image ?
            <Image src={image} alt="uploaded image" objectFit="cover" layout="fill" className="rounded p-1" />
          :
            <p className="w-full flex justify-center items-center">
              No Image Selected
            </p>
          }
        </div>
        <button
          className={`flex justify-center items-center gap-4 btn-sm ${image ? "btn-outline-primary" : "btn-primary"} `}
          onClick={(e) => {
            e.preventDefault();
            if (!image) {
              document.getElementById(title)?.click()
            } else {
              let upload_input = document.getElementById(title) as any;
              upload_input.value = "";
              setImage("");
              setFileName("Upload Image")
            }
          }}
        >
          {image ? <FaTrash /> : <LuUpload />}
          {fileName}
        </button>
      </div>
      <input
        hidden
        id={title}
        type="file"
        name="image"
        accept="image/png, image/jpg"
        onChange={({ target: {files} }) => {
          if (files && files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setFileName(files[0].name)
          }
        }} />
    </div>
  )
}
