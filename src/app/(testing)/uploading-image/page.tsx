"use client"
import React from "react";
import { IKUpload } from "imagekitio-next";
import axios from "axios";


export default function ImagekitUploadingComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const onError = (err: unknown) => {
    console.log("Error", err);
  };

  const onSuccess = async (res:unknown) => {
    const data = res as {
      fileId: string;
      name: string;
      url: string;
      thumbnailUrl: string;
      size: number;
      filePath: string;
      height: number;
      width: number;
      fileType:string
    };

    console.log(data)

    try {
      const response = await axios.post("/api/creating-image-to-db", {
        fileId: data.fileId,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl,
        size: data.size,
        height: data.height,
        width: data.width,
        filePath: data.filePath,
        fileType:data.fileType,
      });
  
      console.log("Upload details saved to DB", response.data);
    } catch (error) {
      console.error("Failed to save upload details:", error);
    }

  
  };

  return (
    <div className="App">
        <div>
          <IKUpload
            onError={onError}
            onSuccess={onSuccess}
            className="bg-red-500 p-4"
          />
        </div>


      {children}
    </div>
  );
}
