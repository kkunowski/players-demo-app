import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/players_view_model.dart';
import 'players_list_view.dart';

class PlayersSearchView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<PlayersViewModel>(context);

    return Column(
      children: [
        TextField(
          onChanged: (value) => viewModel.updateSearchQuery(value),
          decoration: InputDecoration(labelText: 'Search by name'),
        ),
        DropdownButton<String>(
          value: viewModel.selectedPosition,
          items: viewModel.positions.map((position) {
            return DropdownMenuItem(
              value: position,
              child: Text(position),
            );
          }).toList(),
          onChanged: (value) => viewModel.updateSelectedPosition(value ?? 'All'),
        ),
        Expanded(child: PlayersListView()),
      ],
    );
  }
}
