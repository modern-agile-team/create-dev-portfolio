import { Card } from "dev-portfolio";
import styled from "styled-components";

const CardInstruction = ({ id }: { id: string }) => {
  return (
    <div id={id}>
      <CardTitle>Card</CardTitle>
      <CardWrap>
        <Card width="20vw" height="20vw" hover="down">
          This is Card component
        </Card>
        <Card width="20vw" height="20vw" shape="round-square" hover="zoom">
          You can use this components anyware
        </Card>
        <Card width="20vw" height="20vw" shape="round" hover="up">
          See official documentation for details
        </Card>
      </CardWrap>
    </div>
  );
};

export default CardInstruction;

const CardTitle = styled.h1`
  margin: 2em 1em 0 1em;
  padding-bottom: 15px;
  border-bottom: 1px solid;
`;

const CardWrap = styled.div`
  display: flex;
  padding: 3em 3em;
  justify-content: space-around;
`;
