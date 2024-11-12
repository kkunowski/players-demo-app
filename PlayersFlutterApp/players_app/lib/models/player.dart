class Player {
  final String playerId;
  final String fullName;
  final String position;

  Player({required this.playerId, required this.fullName, required this.position});

  factory Player.fromJson(Map<String, dynamic> json) {
    return Player(
      playerId: json['player_id'],
      fullName: json['full_name'],
      position: json['position'],
    );
  }
}
