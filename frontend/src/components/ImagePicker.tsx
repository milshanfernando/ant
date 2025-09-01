import React, { useEffect, useRef, useState } from "react";

type Props = {
  getPickedImage: (file: File | null) => void;
  reset: boolean;
  focus?: () => void;
};

const ImagePicker = ({ getPickedImage, reset, focus }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      setSelectedImage(file);
      getPickedImage(file);
      // You can add further processing of the file here
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    }
  }, [reset]);
  return (
    <div>
      <input
        ref={imageRef}
        type="file"
        className="w-full"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
      <div
        className="p-2 rounded-md border border-gray-900 w-full 
            focus:outline-none focus:ring-2 focus:ring-gray-400
            focus:border-transparent dark:bg-gray-950 dark:text-gray-100 
            dark:border-gray-600 cursor-pointer"
      >
        <button
          type="button"
          className="px-4 py-2 text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white rounded"
          onClick={() => {
            imageRef.current?.click();
            if (focus) focus();
          }}
          // onBlur={() => focus && focus()}
        >
          {selectedImage ? selectedImage.name : "Choose Image"}
        </button>
        {selectedImage && (
          <div className="mt-2 text-sm text-gray-500">
            <img src={URL.createObjectURL(selectedImage)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
