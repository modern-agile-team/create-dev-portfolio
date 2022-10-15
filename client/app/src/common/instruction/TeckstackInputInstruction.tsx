import React from "react";
import styled from "styled-components";

/**
 * TechStackInput used only to find the logoName value in the TechStackList.
 * @component TechStackInput
 * {@link none}
 *
 * If you want to view internal of TeckstackInputInstruction,
 * go to the './src/common/instruction/TeckstackInputInstruction.tsx'
 */
const TeckstackInputInstruction = ({ id }: { id: string }) => {
  return (
    <Wrap id={id}>
      <h1>TechStackInput</h1>
      <span>
        This component is designed to help you select logo when you write the
        TechStackList props.
      </span>
      <span>
        If you want to know the name of the logo for the technology you use when
        you write TechStackList props, search for your technology stack in the
        input window below.
      </span>
      <span>
        Name of the icon you searched is the nameOption's logoName value in
        techStackList props.
      </span>
      <span>
        If you find the logo name you want, you can write it on the
        'TechStackList' component and delete the 'TechStackInput' component!
      </span>
    </Wrap>
  );
};

export default TeckstackInputInstruction;

const Wrap = styled.div`
  padding: 2.2em;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  h1 {
    margin: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid;
  }
`;
