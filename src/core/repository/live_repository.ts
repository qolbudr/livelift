import { getTenantUrl } from "@/core/utils/tenant_url";
import { MainReponse } from "@/core/types/main_response";
import { ApiMethod, apiTenant } from "@/core/api/api";
import { Live } from "@/core/types/live";

export class LiveRepository {
  static addLive = async ({ title, videoId }: { title: string, videoId: string }): Promise<MainReponse<undefined>> => {
    try {
      const response = await apiTenant<MainReponse<undefined>>({
        url: '/api/live',
        method: ApiMethod.POST,
        body: {
          title: title,
          videoId: Number(videoId),
        }
      });

      return response!;
    } catch (e) {
      throw e;
    }
  };

  static getLive = async (): Promise<MainReponse<Live[]> | undefined> => {
    try {
      const response = await apiTenant<MainReponse<Live[]>>({
        url: '/api/live',
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static deleteLive = async (id: number): Promise<MainReponse<undefined>> => {
    try {
      const response = await apiTenant<MainReponse<undefined>>({
        url: '/api/live/' + id,
        method: ApiMethod.DELETE,
      });

      return response!;
    } catch (e) {
      throw e;
    }
  };
}