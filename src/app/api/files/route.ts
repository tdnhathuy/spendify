export async function POST(req: Request) {
  const { accessToken } = await req.json();

  const url =
    // "https://www.googleapis.com/drive/v3/files?pageSize=150&fields=files(id,name,mimeType,createdTime,size,webViewLink,owners,permissions,thumbnailLink)";
    "https://www.googleapis.com/drive/v3/files?pageSize=150&fields=*";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return Response.json(data);
}
