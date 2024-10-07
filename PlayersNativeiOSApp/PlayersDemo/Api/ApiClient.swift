import Foundation

struct APIClient {
    static let shared = APIClient()
    
    func getPlayers(page: Int, limit: Int, searchQuery: String, selectedPosition: String) async throws -> PaginatedItems<Player> {
        let queryItems = [
            URLQueryItem(name: "page", value: "\(page)"),
            URLQueryItem(name: "limit", value: "\(limit)"),
            URLQueryItem(name: "search", value: searchQuery),
            URLQueryItem(name: "position", value: selectedPosition)
        ]
        
        guard let url = APIUtils.makeURL(baseURL: Config.apiBaseURL, path: "/players", queryItems: queryItems) else {
            throw APIClientError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.timeoutInterval = Config.requestTimeout
        
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            try APIUtils.handleResponse(response)
            return try APIUtils.decode(data, to: PaginatedItems<Player>.self)
        } catch let error as URLError where error.code == .timedOut {
            throw APIClientError.timeout
        } catch {
            throw error
        }
    }
}
