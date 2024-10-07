import Foundation

struct APIUtils {
    
    static func makeURL(baseURL: URL, path: String, queryItems: [URLQueryItem]) -> URL? {
        var urlComponents = URLComponents(url: baseURL.appendingPathComponent(path), resolvingAgainstBaseURL: true)
        urlComponents?.queryItems = queryItems
        return urlComponents?.url
    }
    
    static func handleResponse(_ response: URLResponse) throws {
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIClientError.unknownError
        }
        guard httpResponse.statusCode == 200 else {
            throw APIClientError.requestFailed(statusCode: httpResponse.statusCode)
        }
    }
    
    static func decode<T: Decodable>(_ data: Data, to type: T.Type) throws -> T {
        do {
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            throw APIClientError.decodingFailed
        }
    }
}
