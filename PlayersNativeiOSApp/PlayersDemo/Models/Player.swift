struct Player: PaginatedItem {
    let player_id: String
    let full_name: String
    let position: String
    var id: String { player_id }
}
