import React, { useEffect, useState } from "react";
import { FaRegImages } from "react-icons/fa";

const ImageUploader = ({ limit, name, onFileSelect , existingProductImages}) => {
  const [images, setImages] = useState([]);

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const limitedFiles = imageFiles.slice(0, limit - images.length);
    const newImages = limitedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (onFileSelect) {
      const files = images.map((img) => img.file);
      onFileSelect(files);
    }
  }, [images, onFileSelect]);

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Choose a product photo or simply drag and drop up to {limit} photos
        here.
      </p>

      {/* 🔥 Label wraps everything to trigger file input on any click */}
      <label
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-6 text-center hover:border-blue-400 transition block"
      >
        <FaRegImages className="text-4xl text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-500">
          Drop your image here, or <br />
          <span className="text-blue-600 ">Click to browse</span>
        </p>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          name={name}
          onChange={handleChange}
        />
      </label>

      <p className="text-xs text-gray-400 mt-4">
        Image formats: .jpg, .jpeg, .png, preferred size: 1:1.
      </p>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full">
              <img
                src={img.url}
                alt={`preview-${idx}`}
                className="w-full h-24 object-cover rounded-md border"
              />
            </div>
          ))}
        </div>
      )}
        {existingProductImages && existingProductImages.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {existingProductImages.map((img, idx) => (
            <div key={idx} className="relative w-full">
              <img
                src={img.url}
                alt={`preview-${idx}`}
                className="w-full h-24 object-cover rounded-md border"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageUploader;
