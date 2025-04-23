"use client";

import React, { useRef } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import axios from "axios";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

const authenticator = async () => {
  try {
    const response = await fetch("/api/image-kit-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

export default function ImagekitAdvancedUploader() {
  const ikUploadRef = useRef<any>(null);

  const onSuccess = async (res: unknown) => {
    const data = res as {
      fileId: string;
      name: string;
      url: string;
      thumbnailUrl: string;
      size: number;
      filePath: string;
      height: number;
      width: number;
      fileType: string;
    };

    console.log("Upload Success:", data);

    try {
      const response = await axios.post("/api/creating-image-to-db", {
        fileId: data.fileId,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl,
        size: data.size,
        height: data.height,
        width: data.width,
        filePath: data.filePath,
        fileType: data.fileType,
      });
      console.log("Upload details saved to DB", response.data);
    } catch (error) {
      console.error("Failed to save upload details:", error);
    }
  };

  const onError = (err: unknown) => {
    console.error("Upload Error:", err);
  };

  const onUploadProgress = (progress: unknown) => {
    console.log("Upload Progress:", progress);
  };

  const onUploadStart = (evt: unknown) => {
    console.log("Upload Started:", evt);
  };

  return (
    <div className="App p-4">
      <h2 className="text-xl font-bold mb-4">Upload an Image</h2>

      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          fileName="custom-upload.jpg"
          tags={["portfolio", "custom-tag"]}
          isPrivateFile={false}
          useUniqueFileName={true}
          folder="/portfolio-uploads"
          validateFile={(file) => file.size < 5_000_000} // 5 MB limit
          responseFields={["tags", "isPrivateFile", "customCoordinates"]}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [{ type: "transformation", value: "w-400" }],
          }}
          style={{ display: "none" }}
          ref={ikUploadRef}
        />

        <button
          onClick={() => ikUploadRef.current?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Image
        </button>
      </ImageKitProvider>
    </div>
  );
}
