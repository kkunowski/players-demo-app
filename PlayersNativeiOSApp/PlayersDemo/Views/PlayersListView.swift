import SwiftUI

struct PlayersListView: View {
    
    @EnvironmentObject var coordinator: AppCoordinator
    
    @ObservedObject var viewModel: PlayersViewModel

    var body: some View {
           PaginatedLazyListView(viewModel: viewModel) { player in
               Button(action: {
                   coordinator.showPlayerDetail(player: player)
               }) {
                   PlayerRowView(player: player)
               }
           }
       }
}

struct PlayerRowView: View {
    let player: Player
    var body: some View {
        HStack {
            Text(player.full_name)
            Spacer()
            Text(player.position)
                .foregroundColor(.gray)
        }
        .padding(.vertical, 10)
        .padding(.horizontal)
    }
}
