require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

// Retrieve an access token
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// setting the spotify-api goes here:
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

// Our routes go here:
app.get("/", function (req, res) {
  res.render("artists", { title: "Layout" });
});

app.get("/artist-search", (req, res) => {
  const queryString = req.query.q;
  console.log(queryString);
  let artistInfo;
  spotifyApi.searchArtists(queryString).then((data) => {
    artistInfo = data.body.artists.items;
    artistName = data.body.artists.items[0].name;
    albumId = data.body.artists.items[0];
    console.log(albumId.id);

    res.render("artist-search-results", { artistInfo });
  });
});

app.get("/albums/:artistId", (req, res, next) => {
  const queryString = req.albumQuery.albumQuery;
  const albumId = req.params.artistId;
  console.log(albumId);
  // spotifyApi.getArtistAlbums(albumId).then();

  // get Elvis albums

  // spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
  //   function (data) {
  //     console.log("Artist albums", data.body);
  //   },
  //   function (err) {
  //     console.error(err);
  //   }
  // );

  // const clickedAlbum =
  // .getArtistAlbums() code goes here
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
