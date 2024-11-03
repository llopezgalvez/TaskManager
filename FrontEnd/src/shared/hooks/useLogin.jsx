import { useState } from "react";
import toast from 'react-hot-toast'
import { loginRequest } from "../../sevices/api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
      setIsLoading(true);
      const user = { email, password }
      try {
          const response = await loginRequest(user)
          setIsLoading(false);

          if (response.error) {
              toast.error(
                  response?.e?.response?.data ||
                  'Error general al intentar logearse. Intenta de nuevo.'
              );
              return false;  // Indica que el login falló
          }

          console.log(response);
          localStorage.setItem('token', response.data.token)
          return true;  // Indica que el login fue exitoso
      } catch (error) {
          setIsLoading(false);
          toast.error('Error general al intentar logearse. Intenta de nuevo.')
          return false;  // Indica que el login falló
      }
  }

  return {
      login,
      isLoading
  };
};