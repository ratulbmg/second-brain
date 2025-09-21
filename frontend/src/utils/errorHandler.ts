import axios from 'axios';

export interface StandardErrorResponse {
    statusCode: number;
    data: {
        message: string;
        errors: string | null;
    };
    message: string;
    success: false;
}

export const handleApiError = (error: unknown, defaultMessage: string = 'Request failed'): StandardErrorResponse => {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
        // Server responded with error status
        if (error.response) {
            return error.response.data || {
                statusCode: error.response.status,
                data: {
                    message: 'Server Error',
                    errors: error.message
                },
                message: defaultMessage,
                success: false
            };
        }

        // Network errors (no response received)
        if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
            return {
                statusCode: 0,
                data: {
                    message: 'Network Error',
                    errors: 'Please check your internet connection and try again'
                },
                message: defaultMessage,
                success: false
            };
        }

        // Request timeout
        if (error.code === 'ECONNABORTED' || error.code === 'TIMEOUT') {
            return {
                statusCode: 408,
                data: {
                    message: 'Request Timeout',
                    errors: 'The request took too long to complete'
                },
                message: defaultMessage,
                success: false
            };
        }

        // Generic axios error fallback
        return {
            statusCode: 0,
            data: {
                message: 'Connection Failed',
                errors: 'Unable to connect to server'
            },
            message: defaultMessage,
            success: false
        };
    }

    // Non-axios errors (JavaScript runtime errors, etc.)
    return {
        statusCode: 500,
        data: {
            message: 'Unexpected Error',
            errors: error instanceof Error ? error.message : 'Something went wrong'
        },
        message: defaultMessage,
        success: false
    };
};