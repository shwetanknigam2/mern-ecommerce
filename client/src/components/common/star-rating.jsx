import { Star, StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex ">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`p-0.5 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-muted hover:text-foreground"
          }`}

          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <Star
            className={`w-8 h-5 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
