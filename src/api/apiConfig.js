const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '7131f632bda8650f14083ee1357469ff',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;