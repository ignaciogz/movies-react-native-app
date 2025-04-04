export const tmdbApi = {
  getImagePathToApi: (size, path) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export const { getImagePathToApi } = tmdbApi;
