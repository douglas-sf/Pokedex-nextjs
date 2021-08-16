export function getStartPosition(currentPage: number, maxPage: number, buttons: number) {
  const middleButtons = Math.floor(buttons / 2);

  if (currentPage <= middleButtons + 1) return 1;
  if (currentPage >= maxPage - middleButtons) return maxPage - buttons + 1;
  else return currentPage - middleButtons;
}

export function getEndPosition(currentPage: number, maxPage: number, buttons: number) {
  const middleButtons = Math.floor(buttons / 2);

  if (currentPage <= middleButtons + 1) return buttons;
  else if (currentPage >= maxPage - middleButtons) return maxPage;
  else return currentPage + middleButtons;
}
