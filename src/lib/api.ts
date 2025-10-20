const API_BASE_URL = process.env.NEXT_PUBLIC_BEANSTALK_API_URL;

/**
 * Skill interface matching the backend entity
 */
export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiencyLevel: number;
  yearsExperience: number;
  description: string;
  iconUrl: string;
  colorHex: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * API Response wrapper interface
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
  timestamp: number;
  error?: string;
  details?: string;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic API request function with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'API request failed',
        response.status,
        data.details
      );
    }

    if (!data.success) {
      throw new ApiError(
        data.error || 'API returned unsuccessful response',
        response.status,
        data.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      0
    );
  }
}

/**
 * Get all skills from the backend
 *
 * @returns Promise<Skill[]> Array of all skills
 * @throws {ApiError} When the API request fails
 *
 * @example
 * ```typescript
 * try {
 *   const skills = await getAllSkills();
 *   console.log(`Loaded ${skills.length} skills`);
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export async function getAllSkills(): Promise<Skill[]> {
  const response = await apiRequest<Skill[]>('/skills');
  return response.data;
}

/**
 * Health check function to test API connectivity
 *
 * @returns Promise<boolean> True if API is healthy
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    await apiRequest('/skills/health');
    return true;
  } catch {
    return false;
  }
}