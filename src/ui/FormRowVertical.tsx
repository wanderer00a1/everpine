import type { ReactNode } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


interface FormProps {
  label?: string | null;
  error?: { message?: string } | string | undefined;
  children?: { props: { id: string } };
}

function FormRowVertical({ label, error, children }: FormProps) {
  return (
    <StyledFormRow>
      <Label htmlFor={children?.props.id}>{label}</Label>
      {/*typecast*/}
      {children as ReactNode} 
      {error && typeof error === "string" ? (
        <Error>{error}</Error>
      ) : error && typeof error === "object" && error?.message ? (
        <Error>{error.message}</Error>
      ) : null}
    </StyledFormRow>
  );
}

export default FormRowVertical;
