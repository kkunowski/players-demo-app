import SwiftUI

struct PlayersSearchView: View {
    @StateObject private var viewModel = PlayersViewModel()

    var body: some View {
        NavigationView {
            VStack {
                SearchBar(text: $viewModel.searchQuery)
                PositionPicker(selectedPosition: $viewModel.selectedPosition, positions: viewModel.positions)
                PlayersListView(viewModel: viewModel)
            }
            .navigationTitle("Players")
        }
    }
}
