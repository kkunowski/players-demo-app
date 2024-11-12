import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/players_view_model.dart';
import 'player_detail_view.dart';

class PlayersListView extends StatefulWidget {
  @override
  _PlayersListViewState createState() => _PlayersListViewState();
}

class _PlayersListViewState extends State<PlayersListView> {
  late ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    final viewModel = Provider.of<PlayersViewModel>(context, listen: false);
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 200) {
      viewModel.loadPlayers();
    }
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<PlayersViewModel>(context);

    return Column(
      children: [
        if (viewModel.isLoading)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: CircularProgressIndicator(),
          ),
        Expanded(
          child: ListView.builder(
            controller: _scrollController,
            itemCount: viewModel.players.length,
            itemBuilder: (context, index) {
              final player = viewModel.players[index];
              return ListTile(
                title: Text(player.fullName),
                subtitle: Text(player.position),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => PlayerDetailView(player: player)),
                  );
                },
              );
            },
          ),
        ),
      ],
    );
  }
}