/**
 * Explicit autolinking exclusions.
 * @react-native-google-signin/google-signin is not used in this project;
 * setting platforms to null prevents React Native autolinking from trying
 * to configure it even if it ends up in node_modules as a transitive dep.
 */
module.exports = {
  dependencies: {
    '@react-native-google-signin/google-signin': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
