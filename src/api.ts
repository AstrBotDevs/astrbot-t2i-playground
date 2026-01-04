import type { EndpointsResponse, GenerateRequest } from './types';

const ENDPOINTS_API = 'https://api.soulter.top/astrbot/t2i-endpoints';

export async function fetchEndpoints(): Promise<EndpointsResponse> {
  const response = await fetch(ENDPOINTS_API);
  if (!response.ok) {
    throw new Error('Failed to fetch endpoints');
  }
  return response.json();
}

export async function generateImage(
  endpoint: string,
  request: GenerateRequest
): Promise<Blob> {
  // 确保端点 URL 正确拼接
  let url = endpoint.trim().replace(/\/$/, '');
  
  // 如果 URL 已经包含 /generate，直接使用
  if (url.endsWith('/generate')) {
    // 已经是完整路径
  } else if (url.endsWith('/text2img')) {
    // 官方端点格式，添加 /generate
    url = url + '/generate';
  } else {
    // 自定义端点，假设需要添加 /text2img/generate
    url = url + '/text2img/generate';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to generate image: ${error}`);
  }

  return response.blob();
}

