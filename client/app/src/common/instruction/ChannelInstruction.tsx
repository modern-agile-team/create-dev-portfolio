import { Channel, Channels } from "dev-portfolio";
import React from "react";
import styled from "styled-components";
import color from "../style/theme";

/**
 * @component Channel
 * {@link https://github.com/modern-agile-team/dev-portfolio#channel}
 *
 * @component Channels
 * {@link https://github.com/modern-agile-team/dev-portfolio#channels}
 *
 * If you want to view Channel and Channels component,
 * go to the './src/common/instruction/ChannelInstruction.tsx'
 */
const ChannelInstruction = ({ id }: { id: string }) => {
  return (
    <Wrap id={id}>
      <h1>Channel &amp; Channels</h1>
      <span>This component can use anywhere.</span>
      <span>
        Typically, it can be added to the Header and Contact components and
        used.
      </span>
      <span>
        Use Channel if you want to use icons alone or Channels if you want to
        use multiple icons.
      </span>
      <ChannelWrap>
        <div className="Channel">
          <h2>Channel</h2>
          <Channel />
        </div>
        <div className="Channels">
          <h2>Channels</h2>
          <Channels />
        </div>
      </ChannelWrap>
    </Wrap>
  );
};

export default ChannelInstruction;

const Wrap = styled.div`
  padding: 1em 2.2em 0em 2.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  h1 {
    margin: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid;
  }
  h2 {
    margin: 0px 0px 10px 0px;
  }
`;

const ChannelWrap = styled.div`
  width: 50%;
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .Channel {
    margin: 1em 0;
    padding: 15px 30px;
    border: 1px solid ${color.mainColor};
    border-radius: 12px;
    text-align: center;
    box-shadow: 0px 0px 0px 0.5px ${color.pointColor};
  }
  .Channels {
    margin: 1em 0;
    padding: 15px 30px;
    border: 1px solid ${color.mainColor};
    border-radius: 12px;
    text-align: center;
    box-shadow: 0px 0px 0px 0.5px ${color.pointColor};
  }
  @media screen and (max-width: 750px) {
    justify-content: center;
  }
`;
