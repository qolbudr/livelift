import { MainReponse } from "@/core/types/main_response";

export class MediaRepository {
  static addMedia = async ({ title, description, video }: { description: string, title: string, video: File }): Promise<MainReponse<undefined>> => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const userData = user ? JSON.parse(user) : null;
      const tenant = userData?.tenant;


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
}