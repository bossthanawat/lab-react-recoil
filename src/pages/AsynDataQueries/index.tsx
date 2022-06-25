import { Stack, Typography, Box } from "@mui/material";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilValue,
  useRecoilValueLoadable,
  selectorFamily,
} from "recoil";
import { getUserById } from "_services";

const Loading = ({ children="Loading..." }: { children?: React.ReactNode }) => (
  <Box sx={{ color: "primary.main" }}>{children}</Box>
);

const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

const currentUserNameQuery = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {
    // console.count("Call CurrentUserName");
    const { data } = await getUserById({
      id: get(currentUserIDState),
    });
    return data.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  return <Typography>{userName}</Typography>;
}

export function OneSuspense() {
  return (
    <RecoilRoot>
      {/* But what if the request has an error? Recoil selectors can also throw errors which will then be thrown if a component tries to use that value.*/}
      {/* <ErrorBoundary> */}
      <React.Suspense fallback={<Loading/>}>
        <CurrentUserInfo />
      </React.Suspense>
      {/* </ErrorBoundary> */}
    </RecoilRoot>
  );
}

export function MultipleSuspense() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Loading>Loading 1 (Parent)...</Loading>}>
        <Box sx={{ borderStyle: "solid" }}>
          <Typography>Parent</Typography>
          <React.Suspense
            fallback={
              <Loading>Loading (children)...</Loading>
            }
          >
            <Box sx={{ borderStyle: "solid", borderColor: "primary.main" }}>
              <Typography>Children</Typography>
              <CurrentUserInfo />
            </Box>
          </React.Suspense>
        </Box>
      </React.Suspense>
    </RecoilRoot>
  );
}

//Async Queries Without React Suspense
function CurrentUserInfoLoadable() {
  const loadable = useRecoilValueLoadable(currentUserNameQuery);
  switch (loadable.state) {
    case "hasValue":
      return <Typography>{loadable.contents}</Typography>;
    case "loading":
      return <Loading/>;
    case "hasError":
      throw loadable.contents;
  }
}
export function WithoutSuspense() {
  return (
    <RecoilRoot>
      <CurrentUserInfoLoadable />
    </RecoilRoot>
  );
}

// Queries with Parameters

const userNameQuery = selectorFamily({
  key: "UserName",
  get: (userID) => async () => {
    try {
      const { data } = await getUserById({
        id: userID,
      });
      return data.name;
    } catch (err) {
      throw err;
    }
  },
});

function UserInfo({ userID = "" }) {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
}

export function QueriesWithParameters() {
  return (
    <RecoilRoot>
      <React.Suspense
        fallback={<Loading/>}
      >
        <UserInfo userID={"1"} />
        <UserInfo userID={"2"} />
        <UserInfo userID={"3"} />
      </React.Suspense>
    </RecoilRoot>
  );
}
