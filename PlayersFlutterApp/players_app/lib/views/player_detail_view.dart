import 'package:flutter/material.dart';
import '../models/player.dart';

class PlayerDetailView extends StatelessWidget {
  final Player player;

  const PlayerDetailView({Key? key, required this.player}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(player.fullName)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Player ID: ${player.playerId}"),
            Text("Position: ${player.position}"),
          ],
        ),
      ),
    );
  }
}
