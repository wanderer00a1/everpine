import styled, { css } from "styled-components";

interface RowProp {
  type?: "horizontal" | "vertical";
}

const Row = styled.div.attrs<RowProp>((props) => ({
  type: props.type || "vertical",
}))<RowProp>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
