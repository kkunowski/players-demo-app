import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/player.dart';

class APIClient {
  static const baseUrl = 'http://localhost:3000/api'; // Adjust as needed
  static const timeout = Duration(seconds: 10);

  Future<List<Player>> fetchPlayers(int page, int limit, String searchQuery, String position) async {
    final response = await http.get(
      Uri.parse('$baseUrl/players?page=$page&limit=$limit&search=$searchQuery&position=$position'),
    ).timeout(timeout);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return (data['items'] as List).map((e) => Player.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load players');
    }
  }
}

