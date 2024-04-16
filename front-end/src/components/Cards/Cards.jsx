import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setMusicData } from "../../redux/useSlice/musicSlice";

export default function Cards({ data }) {
  const dispatch = useDispatch();

  const handleClick = (musicSource) => {
    dispatch(setMusicData(musicSource))
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
          <Card className="py-4 w-[24%]" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex w-full justify-between items-start">
              <div className="items-start w-[50%]">
                <p className="text-tiny uppercase font-bold">{item.author}</p>
                <small className="text-default-500">{item.type}</small>
                <h4 className="font-bold text-large text-nowrap w-full text-ellipsis bg-black">{item.musicName}</h4>
              </div>
              <div className="w-[50%]">
                <Button
                  color="primary"
                  variant="solid"
                  onClick={() => handleClick(item.musicSource)}
                >
                  Play
                </Button>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-[300px] w-full"
                src={item.musicImage}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
