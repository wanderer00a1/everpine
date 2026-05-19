import { useEffect, type ReactNode } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";

import SpinnerMini from "./SpinnerMini";
import styled from "styled-components";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Protectedroute({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();
  //2. If there is no authenticated user then redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);
  //3. Spinner while loading
  if (isPending)
    return (
      <Fullpage>
        <SpinnerMini />
      </Fullpage>
    );

  //final -> if there is a user render app

  if (isAuthenticated) return children;
}

export default Protectedroute;
