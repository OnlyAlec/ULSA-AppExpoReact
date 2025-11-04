type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig extends RequestInit {
  method?: HttpMethod;
}

interface ApiProblem extends Error {
  status?: number;
  body?: unknown;
}

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    throw new Error("Unable to parse server response as JSON.");
  }
}

export async function fetchJson<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const response = await fetch(endpoint, config);

  if (!response.ok) {
    const problem: ApiProblem = new Error(
      `Request failed with status ${response.status}.`
    );
    problem.status = response.status;
    problem.body = await response.text().catch(() => undefined);
    throw problem;
  }

  return parseJson<T>(response);
}

export async function postFormData<T>(
  endpoint: string,
  formData: FormData,
  config: RequestConfig = {}
): Promise<T> {
  const requestConfig: RequestConfig = {
    method: "POST",
    ...config,
    body: formData,
  };

  return fetchJson<T>(endpoint, requestConfig);
}
