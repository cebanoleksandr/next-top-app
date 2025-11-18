'use client';

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Button from "@/components/UI/Button";
import Rating from "@/components/UI/Rating";

export default function HomeClient() {
  const [isClicked, setIsClicked] = useState(false);
  const [rating, setRating] = useState(4);

  return (
    <div>      
      <Button onClick={() => setIsClicked(!isClicked)}>
        Click Me
        {isClicked ? (
          <ChevronDownIcon className="inline-block size-5" />
        ) : (
          <ChevronRightIcon className="inline-block size-5" />
        )}
      </Button>

      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </div>
  );
}
