import reviewModel from "../models/reviewModel.js"

export default class reviewController {
  static async createReview(request, response) {
    try {
      const userId = request.body.userId;
      const movieId = request.body.movieId;
      const reviewText = request.body.reviewText;
  
      const existingReview = await reviewModel.findOne({ userId: userId, movieId: movieId });
      if (existingReview) {
        response.status(400).send('Review already exists for this movie. Please Update the review');
        return;
      }
  
      const newReview = new reviewModel({
        userId: userId,
        movieId: movieId,
        reviewText: reviewText
      });
  
      const savedReview = await newReview.save();
      response.send(savedReview);
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }

  }
  static async getReviews(request,response)
  {
    try {
        const movieId = request.params.movieId;
        console.log("movieId,",movieId);
        const reviews = await reviewModel.find({movieId: movieId });
        console.log("reviews,",reviews);
        if (reviews.length === 0) {
          response.status(404).send('No reviews found');
        } else {
          console.log(reviews);
          response.send(reviews);
        }
      } catch (err) {
        console.error(err);
        response.status(500).send(err.message);
      }
  }

  static async updateReviews(request,response)
  {
    try {
      const id = request.params.id;
      const updatedReview = request.body.reviewText;
      
      const review = await reviewModel.findByIdAndUpdate(
        id,
        { $set: { reviewText: updatedReview } },
        { new: true }
      );
  
      if (!review) {
        response.status(404).send('Review not found');
      } else {
        console.log(review);
        response.send(review);
      }
    } catch (err) {
      console.error(err);
      response.status(500).send(err.message);
    }
  }
  
  static async deleteReview(request,response)
{
  const id = request.params.id;
  console.log("review userId,",request.user.userId);
  try {
    const review = await reviewModel.findById(id);
    if (!review) {
      response.status(404).send('Review not found');
      return;
    }
    if (review.userId.toString()!== request.user.userId) {
      console.log("review user Id, user id",review.userId,request.user.userId);
      response.status(403).send('Forbidden');
      return;
    }
    const deletedReview = await reviewModel.findByIdAndDelete(id);
    console.log(`Deleted review with ID: ${id}`);
    response.send(`Deleted review with ID: ${id}`);
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message);
  }
}


}


  
