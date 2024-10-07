import Combine
import Foundation

class PlayersViewModel: PaginatedLazyListViewModel<Player> {
    @Published var searchQuery: String = ""
    @Published var selectedPosition: String = "All"
    private var cancellables = Set<AnyCancellable>()
    
    let positions = ["All", "K", "G", "TE", "RB", "QB", "RW", "P"]
    
    override init() {
        super.init()
        setFetchFunction { [weak self] page, limit in
            let position = self?.selectedPosition == "All" ? "" : self?.selectedPosition
            return try await APIClient.shared.getPlayers(page: page, limit: limit, searchQuery: self?.searchQuery ?? "", selectedPosition: position ?? "")
        }
        setupBindings()
        fetchOnStart()
    }
    
    private func fetchOnStart() {
        Task { await resetAndLoadItems() }
    }
    
    private func setupBindings() {
        Publishers.CombineLatest($searchQuery, $selectedPosition)
            .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
            .removeDuplicates { $0 == $1 }
            .sink { [weak self] _, _ in
                Task { await self?.resetAndLoadItems() }
            }
            .store(in: &cancellables)
    }
}
