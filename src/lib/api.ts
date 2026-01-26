import {
  QueryType,
  ApiResponse,
  SubscribeResponse,
  BlogType,
  Category,
  GetSubscriberResponse,
} from "@/types/Types";
import safeJson from "./SafeJson";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchBlogs = async (): Promise<ApiResponse<BlogType[]>> => {
  const res = await fetch(`${API_URL}/api/v1/blogs`);
  const result = await safeJson<ApiResponse<BlogType[]>>(res);
  if (result) {
    return result;
  }
  return { data: [] };
};

export const fetchBlogBySlug = async (
  slug: string,
): Promise<ApiResponse<BlogType> | null> => {
  const res = await fetch(`${API_URL}/api/v1/blogs/${slug}`);
  return await safeJson<ApiResponse<BlogType>>(res);
};

export const fetchBlogCategory = async (): Promise<ApiResponse<Category[]>> => {
  const res = await fetch(`${API_URL}/api/v1/categories`, {
    next: { revalidate: 60 },
  });
  const result = await safeJson<ApiResponse<Category[]>>(res);
  if (result) {
    return result;
  }

  return { data: [] };
};

export async function fetchBlogsByFilter(
  query: QueryType,
): Promise<ApiResponse<BlogType[]>> {
  const res = await fetch(`${API_URL}/api/v1/blogs?${query}`);
  const result = await safeJson<ApiResponse<BlogType[]>>(res);
  if (result) {
    return result;
  }
  return { data: [] };
}

export async function fetchBlogCategoryBySlug(
  slug: string,
): Promise<ApiResponse<BlogType[]> | null> {
  const res = await fetch(`${API_URL}/api/v1/categories/${slug}`);
  return await safeJson<ApiResponse<BlogType[]>>(res);
}

export async function createSubscriber(
  email: string,
): Promise<SubscribeResponse | null> {
  const res = await fetch(`${API_URL}/api/v1/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email }),
  });
  return await safeJson<SubscribeResponse>(res);
}

export async function fetchSubscriber(): Promise<GetSubscriberResponse | null> {
  const res = await fetch(`${API_URL}/api/v1/subscribe`);
  const result = await safeJson<GetSubscriberResponse>(res);

  return result ?? null;
}

