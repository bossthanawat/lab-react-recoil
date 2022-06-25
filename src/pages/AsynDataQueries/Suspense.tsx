import { Stack, Typography, Box } from "@mui/material";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { getUserById } from "_services";

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

function CurrentUserInfoLoadable() {
  const loadable = useRecoilValueLoadable(currentUserNameQuery);
  switch (loadable.state) {
    case 'hasValue':
      return <Typography>{loadable.contents}</Typography>;
    case 'loading':
      return <Box sx={{ color: "primary.main" }}>Loading...</Box>;
    case 'hasError':
      throw loadable.contents;
  }
}

export function OneSuspense() {
  return (
    <RecoilRoot>
      {/* But what if the request has an error? Recoil selectors can also throw errors which will then be thrown if a component tries to use that value.*/}
      {/* <ErrorBoundary> */}
      <React.Suspense
        fallback={<Box sx={{ color: "primary.main" }}>Loading...</Box>}
      >
        <CurrentUserInfo />
      </React.Suspense>
      {/* </ErrorBoundary> */}
    </RecoilRoot>
  );
}

export function MultipleSuspense() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Box>Loading 1 (Parent)...</Box>}>
        <Box sx={{ borderStyle: "solid" }}>
          <Typography>Parent</Typography>
          <React.Suspense
            fallback={
              <Box sx={{ color: "primary.main" }}>Loading 2 (children)...</Box>
            }
          >
            <Box sx={{ borderStyle: "solid", borderColor: "primary.main" }}>
              <Typography>Children 1</Typography>
              <CurrentUserInfo />
            </Box>
          </React.Suspense>
        </Box>
      </React.Suspense>
    </RecoilRoot>
  );
}

//Async Queries Without React Suspense
export function WithoutSuspense() {
  return (
    <RecoilRoot>
      <CurrentUserInfoLoadable />
    </RecoilRoot>
  );
}

export default MultipleSuspense;
