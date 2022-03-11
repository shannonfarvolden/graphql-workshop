const { RESTDataSource } = require('apollo-datasource-rest');

class MusicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }

  getSongs() {
    return this.get(`songs`);
  }

  getSong(id) {
    return this.get(`songs/${id}`);
  }

  getAlbums() {
    return this.get(`albums`);
  }

  getAlbum(id) {
    return this.get(`albums/${id}`);
  }

  getArtists() {
    return this.get(`artists`);
  }

  getArtist(id) {
    return this.get(`artists/${id}`);
  }

  createArtist(artist) {
    return this.post(`artists`, {
      name: artist.name,
    });
  }
}

module.exports = { MusicAPI };
