import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Upload } from "antd";
import { storage } from "../../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function UploadSingleFile({
  folders,
  setMusicUrl,
  setImageUrl,
}) {
  // tạo 1 tham chiếu đến thư mục cần upload
  const listFileRef = ref(storage, `${folders}/`);
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        // lấy url từ firebase sau khi upload file thành công
        const downloadUrl = info.file.response.url;
        if (folders == "musics") {
          setMusicUrl(downloadUrl);
        } else if (folders == "music_images") {
          setImageUrl(downloadUrl);
        }

        message.success("Tải file thành công");
      } else if (info.file.status === "error") {
        message.error("Tải file thất bại");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // tạo 1 tham chiếu đến thư mục chứa file
        const fileRef = ref(listFileRef, file.name);
        // tải file lên firebase
        await uploadBytes(fileRef, file);
        // lấy đường dẫn của file vừa upload
        const downloadUrl = await getDownloadURL(fileRef);
        //gửi thông báo cho phần onChange
        onSuccess({ url: downloadUrl });
      } catch (error) {
        onError(error);
      }
    },
  };
  return (
    <>
      <div>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click để Upload</Button>
        </Upload>
      </div>
    </>
  );
}
