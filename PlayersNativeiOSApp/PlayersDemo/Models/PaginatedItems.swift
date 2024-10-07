protocol PaginatedItem: Identifiable, Codable, Equatable, Hashable {}

struct PaginatedItems<T: PaginatedItem>: Decodable {
    let currentPage: Int
    let totalPages: Int
    let totalItems: Int
    let items: [T]
}
