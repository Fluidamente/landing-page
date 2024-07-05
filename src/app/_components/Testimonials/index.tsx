import React from "react";
import TestimonialItem from "./TestimonialItem/index";
import { testimonials } from "./Testimonials.constants";
import { MessageFavorite } from "iconsax-react";
const Testimonials = () => {
  return (
    <div className="mx-auto mt-10 flex w-[80%] max-w-[1200px] flex-col gap-8 md:flex-row ">
      <div className="flex flex-col gap-8">
        <TestimonialItem
          testimonial={testimonials[0]}
          decorationDirection="left"
          classes="h-3/5"
        />
        <TestimonialItem
          testimonial={testimonials[1]}
          decorationDirection="right"
          classes="h-2/5"
        />
      </div>
      <div className="flex flex-col gap-8">
        <TestimonialItem
          testimonial={testimonials[2]}
          decorationDirection="left"
          classes="2/5"
        />
        <TestimonialItem
          testimonial={testimonials[3]}
          decorationDirection="right"
          classes="3/5"
        />
      </div>
    </div>
  );
};

export default Testimonials;
