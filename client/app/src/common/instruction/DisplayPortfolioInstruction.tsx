import React from "react";
import styled from "styled-components";

const DisplayPortfolioInstruction = () => {
  return (
    <Wrap>
      <h1>Show your career &amp; portfolio</h1>
      <span>
        The three components below are created for use in various areas,
        including your career, experience, and portfolio.
      </span>
      <span>There are three components: Carousel, Gallery, and Masonry.</span>
      <span>
        In common, all components need images, so if you want to write only in
        text, use Experience components.
      </span>
      <span>For more information on using components, see README.md.</span>
    </Wrap>
  );
};

export default DisplayPortfolioInstruction;

const Wrap = styled.div`
  padding: 1em 2.2em 5em 2.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  h1 {
    margin: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid;
  }
`;
