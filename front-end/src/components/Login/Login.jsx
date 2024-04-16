import React from "react";
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
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./icon-svg/MailIcon.jsx";
import { LockIcon } from "./icon-svg/LockIcon.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../api/axios.js";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/useSlice/authSlice.js";

export default function Login({ load }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Email không đúng định dạng"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await baseUrl.post("login", values);
        if (response.status == 200) {
          notification.success({ message: "Đăng nhập thành công" });
          dispatch(setToken(response.data));
          onClose();
          resetForm();
        }
      } catch (error) {
        notification.error({ message: "Đăng ký thất bại" });
        console.log(error);
      }
    },
  });
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Đăng nhập
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form action="" onSubmit={formik.handleSubmit}>
                {" "}
                <ModalHeader className="flex flex-col gap-1">
                  Đăng nhập
                </ModalHeader>
                <ModalBody>
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
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Ghi nhớ tài khoản
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" type="submit">
                    Đăng nhập
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
