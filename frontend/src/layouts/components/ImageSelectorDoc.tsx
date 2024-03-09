import { LuUpload } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageProps {
  title: string,
  file: File | undefined,
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  docImg: string | undefined,
  setDocImg: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export const ImageSelectorDoc: React.FC<ImageProps> = ({ title, file, setFile, docImg, setDocImg }) => {
  const [image, setImage] = useState<string | undefined>("");
  const [fileName, setFileName] = useState("Upload Image");


  const handleDeleteClick =()=>{
    if (!image) {
      document.getElementById(title)?.click()
    } else {
      let upload_input = document.getElementById(title) as any;
      upload_input.value = "";
      setImage("");
      setDocImg("");
      setFileName("Upload Image")
    }
  }

  useEffect(()=>{
    if(file===undefined){
      let upload_input = document.getElementById(title) as any;
      upload_input.value = "";
      setImage(docImg);
      if (docImg === "") {
        setFileName("Upload Image")
      } else {
        setFileName("Delete Image")
      }
    }
  },[file, docImg])


  return (
    <div className="">
      <label className='form-label-profile mb-2 block'>
        {title}
      </label>
      <div className="flex flex-col gap-4">
        <div className="flex dark:border-gray-600 border-gray-300 border-2 rounded border-dashed min-h-[220px] relative">
          {image ?
            <Image src={image} alt="uploaded image" objectFit="cover" layout="fill" className="rounded p-1" />
          :
            <p className="w-full flex justify-center items-center">
              No Documents Selected
            </p>
          }
        </div>
        <button
          className={`flex justify-center items-center gap-4 border btn-sm ${image ? "btn-outline-primary" : "btn-primary"} w-full`}
          onClick={handleDeleteClick}
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
            setDocImg(URL.createObjectURL(files[0]))
            setFileName(files[0].name)
            setFile(files[0])
          }
        }} />

    </div>


  )
}
