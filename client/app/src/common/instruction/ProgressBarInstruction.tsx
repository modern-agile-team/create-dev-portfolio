import { ProgressBar } from "dev-portfolio";
import React from "react";
import styled from "styled-components";
import color from "../../common/style/theme";

/**
 * @component ProgressBar
 * {@link https://github.com/modern-agile-team/dev-portfolio#progressbar}
 *
 * If you want to view ProgressBar component,
 * go to the './src/common/instruction/ProgressBarInstruction.tsx'
 */
const ProgressBarInstruction = ({ id }: { id: string }) => {
  return (
    <Wrap id={id}>
      <h1>ProgressBar</h1>
      <span>
        If you want to use the Progress bar alone on the Tech Stack List, use
        the ProgressBar component.
      </span>
      <span>For a detailed description of props, see README.md.</span>
      <ProgressBar
        rateText="50%"
        backgroundColor={color.lightGrey}
        colorTo={color.pointColor}
        colorFrom={color.pointColor}
        width={"100%"}
        height={"30px"}
        animationType="fill-up-wave"
        isBlinking={true}
      />
    </Wrap>
  );
};

export default ProgressBarInstruction;

const Wrap = styled.div`
  padding: 1em 2.2em 2em 2.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  h1 {
    margin: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid;
  }
`;
