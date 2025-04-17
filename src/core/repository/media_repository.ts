import { MainReponse } from "@/core/types/main_response";
import { ApiMethod, apiTenant } from "@/core/api/api";
import { Video } from "@/core/types/video";
import { getTenantUrl } from "@/core/utils/tenant_url";

export class MediaRepository {
  static addMedia = async ({ title, description, video }: { description: string, title: string, video: File }): Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      const tenant = getTenantUrl();

      let data = new FormData()
      data.append('video', video)
      data.append('title', title)
      data.append('description', description)

      const response = await fetch(`${tenant}/api/upload`,
        {
          method: 'POST',
          body: data,
          headers: {
            'Authorization': token,
          } as HeadersInit
        }
      )
      const json = await response.json();
      if (response.status != 200) throw json;
      return json as MainReponse<undefined>;
    } catch (e) {
      throw e;
    }
  };

  static getMedia = async (): Promise<MainReponse<Video[]> | undefined> => {
    try {
      const response = await apiTenant<MainReponse<Video[]>>({
        url: '/api/media',
        method: ApiMethod.GET,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };

  static deleteMedia = async (id: number): Promise<MainReponse<undefined>> => {
    try {
      const response = await apiTenant<MainReponse<undefined>>({
        url: '/api/media/' + id,
        method: ApiMethod.DELETE,
      });

      return response!;
    } catch (e) {
      throw e;
    }
  };
}