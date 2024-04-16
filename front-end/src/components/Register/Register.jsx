import React from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "./icon-svg/MailIcon.jsx";
import { LockIcon } from "./icon-svg/LockIcon.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserIcon from "./icon-svg/UserIcon.jsx";
import formatDate from "../../utils/formatDate.js";
import baseUrl from "../../api/axios.js";
import { notification } from "antd";

export default function Register() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      reEnPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Vui lòng nhập tên người dùng"),
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu tối thiểu 8 kí tự"),
      reEnPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const user = {
        userName: values.userName,
        email: values.email,
        password: values.password,
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/mixsound-c081f.appspot.com/o/avatar_default%2Favatar-trang-4.jpg?alt=media&token=63b46afe-3711-48ef-b799-fc6d65ddd25b",
        role: "user",
        status: 1,
        createAt: formatDate(),
      };
      try {
        const response = await baseUrl.post("register", user);
        if (response.status == 201) {
          notification.success({ message: "Đăng ký thành công" });
          onClose();
          resetForm();
        }
      } catch (error) {
        notification.error({ message: "Đăng ký thất baij" });
      }
    },
  });
  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">
        Đăng ký
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form action="" onSubmit={formik.handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Đăng ký
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Tên người dùng"
                    placeholder="Nhập tên người dùng"
                    variant="bordered"
                    name="userName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className="text-red-600">{formik.errors.userName}</div>
                  ) : null}
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="abc@gmail.com"
                    variant="bordered"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    type="password"
                    variant="bordered"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    variant="bordered"
                    name="reEnPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reEnPassword}
                  />
                  {formik.touched.reEnPassword && formik.errors.reEnPassword ? (
                    <div className="text-red-600">
                      {formik.errors.reEnPassword}
                    </div>
                  ) : null}
                  <div className="flex py-2 px-1 justify-between">
                    Đã có tài khoản?
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" type="submit">
                    Đăng ký
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
