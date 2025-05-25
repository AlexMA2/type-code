export interface HttpResponse<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}
