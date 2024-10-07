import SwiftUI

class AppCoordinator: ObservableObject {
    
    @Published var navigationPath = NavigationPath()
    
    func showPlayerDetail(player: Player) {
        navigationPath.append(player)
    }
}
