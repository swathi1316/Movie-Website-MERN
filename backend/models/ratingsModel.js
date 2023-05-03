import mongoose from "mongoose";

/*
for creating fields mongoose.Schema is used and in the array or struct , provide field name and its type
    required means it should have some input
    unique means username of two users shouldn't same
*/
const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movieId: {
      type: Number,
      required: [true, "Movie Id is necessary"],
      unique: false,
    },
    rating: {
      type: Number,
      required: [true, "Rating of the movie by User"],
      unique: false,
    },
  });
  
  // Define a unique compound index for userId and movieId
  ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

    export default mongoose.model.ratings || mongoose.model("rating", ratingSchema)