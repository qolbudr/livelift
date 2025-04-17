export const generateURLQueryParam = ({
  body,
  listKey,
}: {
  body: any;
  listKey?: string[];
}): string => {
  var query = '';

  Object.keys(body).forEach((key) => {
    if (body[key] == null || (key == 'search' && body[key] == '')) {
    } else if (Array.isArray(body[key])) {
      query += `${(body[key] as Array<any>).map(
        (v) =>
          `${listKey != null ? `${listKey.join('.')}.` : ''}${key}=${
            body[key]
          }&`
      )}`;
    } else if (typeof body[key] === 'object') {
      query += generateURLQueryParam({
        body: body[key],
        listKey: [...(listKey ?? []), key],
      });
    } else {
      query += `${listKey != null ? `${listKey.join('.')}.` : ''}${key}=${
        body[key]
      }&`;
    }
  });

  return query;
};