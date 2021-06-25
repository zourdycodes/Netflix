import React from "react";
import BrowseContainer from "../containers/browse";
import { useContent } from "../hooks";
import { selectionFilter } from "../utils/index";

export default function Browse() {
  /**
   * todo =>
   * * we need series and the film <--> fetching from database with use-content hooks
   * * we also need slides
   * * pass it to the browse container ==> make browse container will contain browse components
   */
  const { series } = useContent("series");
  const { films } = useContent("films");

  const slides = selectionFilter({ series, films });

  return (
    <>
      <BrowseContainer slides={slides} />
    </>
  );
}
