import SwiftUI

@main
struct PlayersDemoApp: App {
    
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    @StateObject private var coordinator = AppCoordinator()
    
    var body: some Scene {
        WindowGroup {
            NavigationStack(path: $coordinator.navigationPath) {
                PlayersSearchView()
                    .navigationDestination(for: Player.self) { player in
                        PlayerDetailView(player: player)
                    }
            }
            .environmentObject(coordinator)
        }
    }
}
