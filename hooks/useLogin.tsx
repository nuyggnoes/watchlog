import { HTTP_METHOD } from "@/app/api/constants";
import { API_ENDPOINTS } from "@/app/api/endpoints";
import { apiRequest } from "@/lib/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState<{ login?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await apiRequest(API_ENDPOINTS.USER_LOGIN, {
      method: HTTP_METHOD.POST,
      body: { ...form },
    });
    console.log(result);
    if (result.ok && result.success) {
      router.replace("/");
      router.refresh();
    } else if (result.errors) {
      setErrors(result.errors);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { form, errors, handleSubmit, handleChange };
}
