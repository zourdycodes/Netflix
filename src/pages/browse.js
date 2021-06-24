import React from "react";
import { useContent } from "../hooks";

export default function Browse() {
  /**
   * todo =>
   * * we need series and the film <--> fetching from database with use-content hooks
   * * we also need slides
   * * pass it to the browse container ==> make browse container will contain browse components
   */
  const { series } = useContent("series");
  const { films } = useContent("films");

  return (
    <>
      <h1>Hello From Browse</h1>
    </>
  );
}
