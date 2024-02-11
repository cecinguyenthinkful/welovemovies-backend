const services = require("./movies.services");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await services.read(movieId); 
  if (movie) {
    res.locals.movie = movie;
    return next();
  } 
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

function read(req, res) {
  res.json({ data: res.locals.movie });
}


async function movieIsShowing(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    res.locals.movies = await services.moviesInTheaters();
    return next();
  } else {
    res.locals.movies = await services.list();
    return next();
  }
}


function list(req, res) {
  res.json({ data: res.locals.movies });
}

module.exports = {
  list: [movieIsShowing, list],
  read: [movieExists, read],
};
