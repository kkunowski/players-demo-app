import { Player } from '../types/Player';
import { PaginatedItems } from '../types/PaginatedItems'

declare global {
  interface Array<T> {
    findPlayerById(playerId: string): Player | undefined;
    searchByFullName(searchString: string): Player[];
    filterByPosition(position: string): Player[];
    paginate(page: number, limit: number): PaginatedItems<T>;
  }
}

Array.prototype.findPlayerById = function (playerId: string): Player | undefined {
  return this.find((player: Player) => player.player_id === playerId);
};

Array.prototype.findPlayerById = function (playerId: string): Player | undefined {
  return this.find((player: Player) => player.player_id === playerId);
};

Array.prototype.searchByFullName = function (searchString: string): Player[] {
  if (!searchString.trim()) {
    return this;
  }
  const lowerCaseSearchString = searchString.toLowerCase();
  return this.filter((player: Player) => 
    player.full_name && player.full_name.toLowerCase().includes(lowerCaseSearchString)
  );
};

Array.prototype.filterByPosition = function (position: string): Player[] {
  if (!position.trim()) {
    return this;
  }
  return this.filter((player: Player) => player.position === position);
};

const paginateArray = <T>(items: T[], page: number, limit: number): PaginatedItems<T> => {
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);
  return {
    currentPage: page,
    totalPages: Math.ceil(items.length / limit),
    totalItems: items.length,
    items: paginatedItems,
  };
};

export { paginateArray };