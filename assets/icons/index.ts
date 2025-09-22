// Centralized icon imports for better bundling and type safety
export const icons = {
  home: require('./home.png'),
  archiveBook: require('./archive-book.png'),
  bookSaved: require('./book-saved.png'),
  chart: require('./chart.png'),
  user: require('./user.png'),
  messengerButton: require('./messenger-button.png'),
  search: require('./search.png'),
  chevronRight: require('./chevron-right.png'),
  logout: require('./logout.png'),
  bell: require('./bell.png'),
  leftArrow: require('./left-arrow.png'),
} as const;

export type IconName = keyof typeof icons;
