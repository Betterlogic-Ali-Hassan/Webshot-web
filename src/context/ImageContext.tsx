"use client";

import type React from "react";
import { createContext, useContext, useState, useRef, Ref } from "react";

// Define the context type
type ImageEditorContextType = {
  isHeightExpanded: boolean;
  setUploadedImage: (uploadedImage: string | null | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsHeightExpanded: (isHeight: any) => void;
  uploadedImage: string | null | undefined;
  fileInputRef: Ref<HTMLInputElement> | undefined;
  // Methods
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
};

// Create the context with a default undefined value
const ImageEditorContext = createContext<ImageEditorContextType | undefined>(
  undefined
);

// Provider component
export const ImageEditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null | undefined>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPG, PNG, etc.)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  // Create the context value object
  const contextValue: ImageEditorContextType = {
    setUploadedImage,
    uploadedImage,
    isHeightExpanded,
    setIsHeightExpanded,
    fileInputRef,
    // Methods
    handleFileUpload,
    handleUpload,
  };

  return (
    <ImageEditorContext.Provider value={contextValue}>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: "none" }}
        accept='image/*'
        onChange={handleFileUpload}
      />
      {children}
    </ImageEditorContext.Provider>
  );
};

// Custom hook to use the context
export const useImageEditor = () => {
  const context = useContext(ImageEditorContext);
  if (context === undefined) {
    throw new Error(
      "useImageEditor must be used within an ImageEditorProvider"
    );
  }
  return context;
};
