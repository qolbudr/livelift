import { ApiMethod, apiTenant } from "../api/api";
import { History } from "@/core/types/history";
import { MainReponse } from "../types/main_response";

export class HistoryRepository {
  static getHistory = async (): Promise<MainReponse<History[]> | undefined> => {
    try {
      const response = await apiTenant<MainReponse<History[]>>({
        url: '/api/history',
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };
}