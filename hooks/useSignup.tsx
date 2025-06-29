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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = await apiRequest(API_ENDPOINTS.USER_SIGNUP, {
      method: HTTP_METHOD.POST,
      body: { ...form },
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
