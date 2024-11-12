import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/api_client.dart';
import 'view_models/players_view_model.dart';
import 'views/players_search_view.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(create: (_) => APIClient()),
        ChangeNotifierProvider(create: (context) => PlayersViewModel(apiClient: context.read<APIClient>())),
      ],
      child: MaterialApp(
        title: 'Players App',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: Scaffold(
          appBar: AppBar(title: Text("Players")),
          body: PlayersSearchView(),
        ),
      ),
    );
  }
}