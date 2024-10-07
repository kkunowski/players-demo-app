import SwiftUI

struct PlayerDetailView: View {
    let player: Player
    
    var body: some View {
        VStack {
            Text("Player ID: \(player.player_id)")
            Text("Name: \(player.full_name)")
            Text("Position: \(player.position)")
            Spacer()
        }
        .padding()
    }
}
