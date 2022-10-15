import React from "react";
import styled from "styled-components";

/**
 * Just introduction for Contact.
 *
 * If you want to view internal of ContactInstruction,
 * go to the './src/common/instruction/ContactInstruction.tsx'
 */
const ContactInstruction = () => {
  return (
    <Wrap>
      <h1>Contact</h1>
      <span>
        This component is freedom to fill out the necessary parts such as your
        information, contact network, etc.
      </span>
      <span>
        The script written below is an example, and fill it in with the
        information you want to provide!
      </span>
    </Wrap>
  );
};

export default ContactInstruction;

const Wrap = styled.div`
  padding: 3em 2.2em 2em 2.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  h1 {
    margin: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid;
  }
`;
