import Combine
import Foundation

@MainActor
class PaginatedLazyListViewModel<T: PaginatedItem>: ObservableObject {
    @Published var items: [T] = []
    @Published var isLoading: Bool = false
    @Published var error: Error?
    
    private var fetchFunction: ((Int, Int) async throws -> PaginatedItems<T>)?
    private let limit: Int = 10
    private var totalItems = 0
    private var currentPage = 1
    
    func setFetchFunction(_ fetchFunction: @escaping (Int, Int) async throws -> PaginatedItems<T>) {
        self.fetchFunction = fetchFunction
    }
    
    func loadMoreItems() async {
        guard let fetchFunction = fetchFunction, canLoadMore else { return }
        
        isLoading = true
        do {
            let result = try await fetchFunction(currentPage, limit)
            appendItems(result)
            currentPage += 1
        } catch {
            self.error = error
        }
        isLoading = false
    }
    
    var canLoadMore: Bool {
        return !isLoading && (items.count < totalItems || items.isEmpty)
    }
    
    func resetAndLoadItems() async {
        resetPagination()
        await loadMoreItems()
    }
    
    private func appendItems(_ result: PaginatedItems<T>) {
        totalItems = result.totalItems
        items += result.items
    }
    
    private func resetPagination() {
        currentPage = 1
        totalItems = 0
        items.removeAll()
        error = nil
    }
}
