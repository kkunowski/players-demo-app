import 'dart:async';
import 'package:flutter/material.dart';
import '../services/api_client.dart';
import '../models/player.dart';

class PlayersViewModel extends ChangeNotifier {
  final APIClient apiClient;
  List<Player> players = [];
  int currentPage = 1;
  bool isLoading = false;
  bool isFetchingMore = false;
  bool hasMore = true;
  String searchQuery = '';
  String selectedPosition = 'All';
  final List<String> positions = ['All', 'K', 'G', 'TE', 'RB', 'QB', 'RW', 'P'];

  Timer? _debounce;

  PlayersViewModel({required this.apiClient}) {
    loadPlayers();
  }

  Future<void> loadPlayers({bool reset = false}) async {
    if (reset) {
      players = [];
      currentPage = 1;
      hasMore = true;
      isLoading = true;
      isFetchingMore = false;
      notifyListeners();
    } else {
      if (isFetchingMore || !hasMore) return;
      isFetchingMore = true;
      notifyListeners();
    }

    final position = selectedPosition == 'All' ? '' : selectedPosition;

    try {
      final fetchedPlayers = await apiClient.fetchPlayers(currentPage, 10, searchQuery, position);
      if (fetchedPlayers.isEmpty) {
        hasMore = false;
      } else {
        players.addAll(fetchedPlayers);
        currentPage++;
      }
    } catch (error) {
      print('Failed to load players: $error');
    } finally {
      if (reset) {
        isLoading = false;
      } else {
        isFetchingMore = false;
      }
      notifyListeners();
    }
  }

  void updateSearchQuery(String query) {
    searchQuery = query;
    _debounceLoadPlayers();
  }

  void updateSelectedPosition(String position) {
    selectedPosition = position;
    _debounceLoadPlayers();
  }

  void _debounceLoadPlayers() {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      loadPlayers(reset: true);
    });
  }

  @override
  void dispose() {
    _debounce?.cancel();
    super.dispose();
  }
}