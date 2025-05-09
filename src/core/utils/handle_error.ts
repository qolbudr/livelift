import { MainReponse } from "@/core/types/main_response";

export const handleError = (error: unknown) => {
  const e = error as MainReponse<undefined>;
  return e.message;
}