import ratingsModel from "../models/ratingsModel.js";

export default class ratingController {
  static async createRatings(request, response) {
    try {
      const userId = request.body.userId;
      const movieId = request.body.movieId;
      const ratingNumber = request.body.rating;
  
      const existingRating = await ratingsModel.findOne({ userId: userId, movieId: movieId });
      if (existingRating) {
        response.status(400).send('Rating already exists for this movie. Please Update the rating');
        return;
      }
      const newRating = new ratingsModel({
        userId: userId,
        movieId: movieId,
        rating: ratingNumber
      });
  
      const savedRating= await newRating.save();
      response.send(savedRating);
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }

  }
  static async getRatings(request,response)
  {
    try {
        const movieId = request.params.movieId;
        console.log("movieId,",movieId);
        const ratings = await ratingsModel.find({movieId: movieId });
        console.log("ratings,",ratings);
        if (ratings.length === 0) {
          response.status(404).send('No ratings found');
        } else {
          console.log(ratings);
          response.send(ratings);
        }
      } catch (err) {
        console.error(err);
        response.status(500).send(err.message);
      }
  }

  static async updateRatings(request,response)
  {
    try {
      const id = request.params.id;
      const updatedRating = request.body.rating;
      console.log("rating,",updatedRating);
      const ratings = await ratingsModel.findByIdAndUpdate(
        id,
        { $set: { rating: updatedRating } },
        { new: true }
      );
      console.log("updatedRatings,",ratings);
      if (!ratings) {
        response.status(404).send('Rating not found');
      } else {
        console.log(ratings);
        response.send(ratings);
      }
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }
  }
  
}
