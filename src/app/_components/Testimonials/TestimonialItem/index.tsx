"use client";
import { CardBody, Card } from "@nextui-org/react";
import React from "react";
import { TestimonialItemProps } from "../Testimonials.constants";
import { MessageFavorite } from "iconsax-react";

const TestimonialItem = ({
  testimonial,
  classes,
  decorationDirection,
}: {
  testimonial: TestimonialItemProps;
  classes?: string;
  decorationDirection?: "left" | "right";
}) => {
  return (
    <div className={`relative ${classes}`}>
      <div
        className={`absolute top-[-15px] z-10  ${decorationDirection === "left" ? "left-[-15px]" : "right-[-15px]"}`}
      >
        <MessageFavorite
          className="h-12 w-12 text-primary-dark"
          variant="Bold"
        />
      </div>
      <Card
        className=" elevation h-full bg-primary-light"
        style={{
          borderRadius: "40px",
          boxShadow: "17px 17px 5px rgba(0, 0, 0, 0.30)",
        }}
        key={testimonial.id}
      >
        <CardBody className=" w-full">
          <div className="h-full w-full">
            {testimonial?.content?.map((c, index) => (
              <p
                key={index}
                className="pt-10 text-center font-openSans text-lg font-normal text-white"
              >
                {c}
              </p>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TestimonialItem;
