import {
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilValue,
  selectorFamily,
  useSetRecoilState,
  useRecoilRefresher_UNSTABLE,
  waitForAll,
} from "recoil";
import { getUserById } from "_services";
import { Loading } from ".";

// Data-Flow Graph

const currentUserIDState = atom({
  key: "CurrentUserID_DataFlowGraph",
  default: "1" as string | null, // <-- ถ้า null แต่แรกจะ error ถ้าต้องการให้ null ได้แต่แรกต้องไป handle userInfoQuery ให้รับ null ได้
});

const userInfoQuery = selectorFamily({
  key: "UserInfoQuery_DataFlowGraph",
  get: (userID) => async () => {
    try {
      const { data } = await getUserById({
        id: userID,
      });
      return data;
    } catch (err) {
      throw err;
    }
  },
});

const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery_DataFlowGraph",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  // ถ้าไม่ใช้ waitForAll จะทำทีละ Query เรียงกันไป (ต่อคิว)
  // get: ({ get }) => {
  //   const { friendList } = get(currentUserInfoQuery);
  //   return friendList.map((friendID) => get(userInfoQuery(friendID))
  //   );
  // },
  get: ({ get }) => {
    const { friendList } = get(currentUserInfoQuery);
    const friends = get(
      waitForAll(friendList.map((friendID) => userInfoQuery(friendID)))
    );
    return friends;
  },
});

const friendsInfoQueryByCase = selectorFamily({
  key: "FriendsInfoQuery",
  get:
    (isConcurrent) =>
    ({ get }) => {
      const { friendList } = get(currentUserInfoQuery);
      if (isConcurrent) {
        const friends = get(
          waitForAll(friendList.map((friendID) => userInfoQuery(friendID)))
        );
        return friends;
      } else {
        return friendList.map((friendID) => get(userInfoQuery(friendID)));
      }
    },
});

function CurrentUserInfoData() {
  const [isConcurrent, setIsConcurrent] = useState(true);
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQueryByCase(isConcurrent));
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  const refreshCurrentUser = useRecoilRefresher_UNSTABLE(currentUserInfoQuery);
  const refreshFriends = useRecoilRefresher_UNSTABLE(
    friendsInfoQueryByCase(isConcurrent)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConcurrent(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel control={<Switch checked={isConcurrent} onChange={handleChange}></Switch>} label="Concurrent Requests"/>
      <Stack direction={"row"} spacing={1}>
        <Typography variant="h6">Current User : {currentUser.name}</Typography>
        <Button onClick={() => refreshCurrentUser()}>
          Refresh Current User
        </Button>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <Typography variant="h6">Friends List</Typography>
        <Button onClick={() => refreshFriends()}>Refresh Friends</Button>
      </Stack>
      <List>
        {friends.map((friend) => (
          <ListItemButton
            key={friend.id}
            onClick={() => setCurrentUserID(friend.id)}
          >
            <ListItemText primary={friend.name} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export function DataFlowGraph() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Loading />}>
        <CurrentUserInfoData />
      </React.Suspense>
    </RecoilRoot>
  );
}
