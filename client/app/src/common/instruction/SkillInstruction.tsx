import { Skill } from "dev-portfolio";
import React from "react";
import styled from "styled-components";

/**
 * @component Skill
 * {@link https://github.com/modern-agile-team/dev-portfolio#skill}
 *
 * If you want to view Skill component,
 * go to the './src/common/instruction/SkillInstruction.tsx'
 */
const SkillInstruction = ({ id }: { id: string }) => {
  return (
    <Wrap id={id}>
      <h1>Skill</h1>
      <span>
        If you want to show each stack without using the Tech Stack List, you
        can use this component.
      </span>
      <span>See dev-portfolio README.md for iconName assignments.</span>
      <SKillWrap>
        <Skill />
        <Skill
          title="Typescript"
          iconName="vscode-icons:file-type-typescript-official"
        />
        <Skill title="HTML-5" iconName="vscode-icons:file-type-html" />
        <Skill title="CSS" iconName="vscode-icons:file-type-css" />
        <Skill title="Node.js" iconName="logos:nodejs-icon" />
        <Skill title="Express" iconName="logos:express" />
      </SKillWrap>
    </Wrap>
  );
};

export default SkillInstruction;

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

const SKillWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
`;
