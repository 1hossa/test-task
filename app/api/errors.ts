export class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly endpoint: string,
        message?: string,
    ) {
        super(message ?? `API request failed [${status}]: ${endpoint}`)
        this.name = 'ApiError'
    }
}
