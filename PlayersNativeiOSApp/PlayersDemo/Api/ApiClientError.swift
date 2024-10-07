import Foundation

enum APIClientError: Error, LocalizedError {
    case invalidURL
    case requestFailed(statusCode: Int)
    case decodingFailed
    case timeout
    case unknownError
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "The URL provided was invalid."
        case .requestFailed(let statusCode):
            return "The request failed with status code \(statusCode)."
        case .decodingFailed:
            return "Failed to decode the server response."
        case .timeout:
            return "The request timed out."
        case .unknownError:
            return "An unknown error occurred."
        }
    }
}
