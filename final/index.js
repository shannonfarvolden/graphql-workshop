const { ApolloServer, gql } = require('apollo-server');
const { MusicAPI } = require('./datasources/MusicAPI');

const typeDefs = gql`
  type Song {
    id: ID!
    title: String!
    time: String!
  }

  type Album {
    id: ID!
    title: String!
    songs: [Song!]!
    genre: String!
    releaseDate: String
  }

  type Artist {
    id: ID!
    name: String!
    albums: [Album!]!
  }

  type Query {
    artists: [Artist!]!
    artist(id: ID!): Artist
    album(id: ID!): Album
    song(id: ID!): Song
  }

  type Mutation {
    addArtist(name: String): Artist
  }
`;

const resolvers = {
  Query: {
    artists: (_, __, { dataSources }) => {
      return dataSources.musicAPI.getArtists();
    },
    artist: (_, { id }, { dataSources }) => {
      return dataSources.musicAPI.getArtist(id);
    },
  },
  Artist: {
    albums: ({ albumIds }, _, { dataSources }) => {
      if (!albumIds) {
        return [];
      }
      return albumIds.map((albumId) => dataSources.musicAPI.getAlbum(albumId));
    },
  },
  Album: {
    songs: ({ songIds }, _, { dataSources }) => {
      if (!songIds) {
        return [];
      }

      return songIds.map((songId) => dataSources.musicAPI.getSong(songId));
    },
  },
  Mutation: {
    addArtist: (_, { name }, { dataSources }) => {
      return dataSources.musicAPI.createArtist({ name: name });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      musicAPI: new MusicAPI(),
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
