import { HTTP_METHOD } from "@/app/api/constants";
import { API_ENDPOINTS } from "@/app/api/endpoints";
import { apiRequest } from "@/lib/utils/api";
import { useUserState } from "@/stores/userStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ login?: string }>({});
  const [loading, setLoading] = useState(false);
  const login = useUserState((s) => s.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const result = await apiRequest<UserWithOutPassword>(API_ENDPOINTS.USER_LOGIN, {
      method: HTTP_METHOD.POST,
      body: { ...form },
    });
    router.refresh();
    if (result.ok && result.success) {
      // router.replace("/");
      window.location.replace("/");
      login({
        id: result.data!.id,
        email: result.data!.email,
      });
    } else if (result.errors) {
      setErrors(result.errors);
    }
    setLoading(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { form, errors, loading, handleSubmit, handleChange };
}
