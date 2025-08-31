import { HTTP_METHOD } from "@/app/api/constants";
import { API_ENDPOINTS } from "@/app/api/endpoints";
import { ErrorType } from "@/constants/errors";
import { apiRequest } from "@/lib/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useSignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null as File | null,
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      password:
        form.confirmPassword !== "" && form.password !== form.confirmPassword
          ? "비밀번호가 일치하지 않습니다."
          : undefined,
    }));
  }, [form.password, form.confirmPassword]);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // FormData로 파일과 함께 전송
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (form.profileImage) {
      formData.append("profileImage", form.profileImage);
    }

    const result = await fetch(API_ENDPOINTS.USER_SIGNUP, {
      method: HTTP_METHOD.POST,
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      return { ok: res.ok, ...data };
    });
    if (result.ok && result.success) {
      router.push("/");
    } else if (result.errors) {
      // const newErrors: typeof errors = {};
      // if (result.code === ErrorType.DUPLICATE_EMAIL) {
      //   newErrors.email = result.error;
      // } else if (result.code === ErrorType.DUPLICATE_NAME) {
      //   newErrors.name = result.error;
      // }
      // setErrors(newErrors);
      setErrors(result.errors);
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
}
