export const formatPrice = (price, withDecimals = false) => {
  let config = {
    style: 'currency',
    currency: 'ARS',
  }

  if (!withDecimals) {
    config = {
      ...config,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  }

  const formatter = new Intl.NumberFormat('es-AR', config);

  return formatter.format(price);
};

export const formatMovieReleaseDate = (release_date) => {
  const date = parseInt(release_date.substring(8, 10));
  const month = new Date(release_date).toLocaleString('es-AR', { month: 'long' });
  const year = release_date.substring(0, 4);

  return `Desde el ${date} de ${month} de ${year}`;
};

export const formatMovieRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = Math.floor(runtime % 60)

  return runtime >= 60
          ? `${hours}h ${minutes}m`
          : `${minutes}m`;
};

export const formatMovieVotes = (average, count) => {
  return {
    votes_average: `${average.toFixed(1)}`,
    votes_count: `(${count} Comentarios)`,
  }
};
