// This is a shim for web and Android where the tab bar is generally opaque.
export default undefined;

export function useBottomTabOverflow() {
  // Return a default value since we're not using React Navigation
  return 0;
}
