import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  content: string;
}

const ServiceCard = ({ imageSrc, title, content }: ServiceCardProps) => {
  return (
    <Card
      className="max-w-[350px]"
      style={{
        borderRadius: "40px",
      }}
    >
      <CardBody className="relative max-h-[200px] w-full max-w-[350px] overflow-visible rounded-none p-0">
        <div className="absolute z-10 h-full w-full bg-primary opacity-30 hover:opacity-0"></div>
        <Image
          alt="Card background"
          className="z-5 h-[200px] object-cover p-0"
          src={imageSrc}
          width={355}
          radius="none"
          isBlurred={true}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-center ">
        <h3 className="font-poppins text-2xl text-primary">{title}</h3>
        <p className="text-md text-center font-raleway text-foreground">
          {content}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
