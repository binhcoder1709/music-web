import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadSingleFile from "../../../components/UploadFile/UploadSIngleFile";
import { Image, notification } from "antd";
import baseUrl from "../../../api/axios";
import formatDate from "../../../utils/formatDate";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectToken } from "../../../redux/useSlice/authSlice";

export default function Upload() {
  // state
  const [musicUrl, setMusicUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();

  // get id user
  const token = useSelector(selectToken);
  const decode = jwtDecode(token);

  // music upload function
  const formik = useFormik({
    initialValues: {
      musicName: "",
      type: ""
    },
    validationSchema: Yup.object({
      musicName: Yup.string().required("Vui lòng nhập tên bài hát"),
      type: Yup.string().required("Vui lòng nhập thể loại"),
    }),
    onSubmit: async (values) => {
      const music = {
        musicName: values.musicName,
        author: decode.userName,
        authorId: decode.id,
        musicSource: musicUrl,
        musicImage: imageUrl,
        type: values.type,
        createdAt: formatDate(),
      };
      try {
        const response = await baseUrl.post("musics", music, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        if (response.status == 201) {
          notification.success({ message: "Thêm dữ liệu thành công" });
        }
      } catch (error) {
        if (error.response.status == 403) {
          dispatch(clearToken());
        }
      }
    },
  });
  return (
    <form className="p-10 pb-24" onSubmit={formik.handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-3xl font-semibold text-center leading-7 text-gray-900">
            Tải nhạc
          </h1>
          <p className="mt-1 text-sm text-center leading-6 text-gray-600">
            Tải nhạc lên trang cá nhân của bạn
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tải ảnh
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Image
                  src={
                    imageUrl == null
                      ? "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
                      : imageUrl
                  }
                  className="object-cover rounded-full"
                  style={{ width: "50px", height: "50px" }}
                  aria-hidden="true"
                />
                <UploadSingleFile
                  folders={"music_images"}
                  setImageUrl={setImageUrl}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tải nhạc
              </label>
              <UploadSingleFile folders={"musics"} setMusicUrl={setMusicUrl} />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Thông tin bài hát
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="musicName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên bài hát
              </label>
              <div className="mt-2">
                <input
                  id="musicName"
                  name="musicName"
                  value={formik.values.musicName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.musicName && formik.errors.musicName ? (
                <div className="text-red-600">{formik.errors.musicName}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thể loại
              </label>
              <div className="mt-2">
                <input
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.type && formik.errors.type ? (
                <div className="text-red-600">{formik.errors.type}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Tải lên
        </button>
      </div>
    </form>
  );
}
