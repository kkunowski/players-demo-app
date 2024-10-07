import SwiftUI

struct PaginatedLazyListView<T: PaginatedItem, Content: View>: View {
    @ObservedObject var viewModel: PaginatedLazyListViewModel<T>
    
    @ViewBuilder let content: (T) -> Content
    
    var body: some View {
        ScrollView {
            LazyVStack {
                if let error = viewModel.error {
                    errorView(error: error)
                } else {
                    itemsView
                    if viewModel.isLoading {
                        loadingView
                    }
                }
            }
            .padding(.horizontal)
        }
    }
    
    @ViewBuilder
    private func errorView(error: Error) -> some View {
        Text(error.localizedDescription)
            .foregroundColor(.red)
            .multilineTextAlignment(.center)
            .padding()
    }
    
    @ViewBuilder
    private var itemsView: some View {
        ForEach(viewModel.items) { item in
            content(item)
                .onAppear {
                    if item == viewModel.items.last && viewModel.canLoadMore {
                        Task {
                            await viewModel.loadMoreItems()
                        }
                    }
                }
        }
    }
    
    private var loadingView: some View {
        ProgressView()
            .padding()
    }
}
