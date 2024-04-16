import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import baseUrl from "../../../api/axios";

export default function Home() {
  const [musicData, setMusicData] = useState([]);
  console.log(musicData);
  // get musics data
  const fetchData = async () => {
    try {
      const response = await baseUrl.get("musics");

      setMusicData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Cards data={musicData} />
    </>
  );
}
