export const apiGetWidgetByIdForEmbed = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL + `/api-route?id=${id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};
