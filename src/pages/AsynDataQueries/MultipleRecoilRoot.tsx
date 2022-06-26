import { Typography } from "@mui/material";
import React from "react";
import { RecoilRoot, selector, useRecoilValue } from "recoil";
import { getUserById } from "_services";
import { currentUserIDState, Loading } from ".";

// MultipleRecoilRoot
// ดู log count
// log count จะเท่ากับ 1 ถึงแม้จะมีหลาย RecoilRoot แต่เรียกใช้ currentUserNameQueryLog ตัวเดียวกัน โดย default https://recoiljs.org/docs/api-reference/core/RecoilRoot/

const currentUserNameQueryLog = selector({
  key: "CurrentUserNameLog",
  get: async ({ get }) => {
    console.count("Call currentUserNameQueryLog");
    const { data } = await getUserById({
      id: get(currentUserIDState),
    });
    return data.name;
  },
});

function CurrentUserInfoLog() {
  const userName = useRecoilValue(currentUserNameQueryLog);
  return <Typography>{userName}</Typography>;
}

export function MultipleRecoilRoot() {
  return (
    <RecoilRoot>
      {/* 1 */}
      <RecoilRoot>
        <React.Suspense fallback={<Loading />}>
          <CurrentUserInfoLog />
        </React.Suspense>
      </RecoilRoot>
      {/* 2 */}
      <RecoilRoot>
        <React.Suspense fallback={<Loading />}>
          <CurrentUserInfoLog />
        </React.Suspense>
      </RecoilRoot>
      {/* 3 */}
      <RecoilRoot>
        <React.Suspense fallback={<Loading />}>
          <CurrentUserInfoLog />
        </React.Suspense>
      </RecoilRoot>
    </RecoilRoot>
  );
}

// เมื่อใช้ useRecoilValue
// ถ้าไม่ใส่ Suspense เลยจะ error

// เมื่อใช้ useRecoilValue
// ถ้า RecoilRoot ย่อยไม่ใส่ Suspense จะติด Suspense  (Loading... ตลอดไป) จนกว่าจะเกิดการ rerender ใหม่ เช่น กดกลับแล้วกลับหน้ามาใหม่

const currentUserNameQuery_NotSuspense = selector({
  key: "CurrentUserNameQuery_NotSuspense",
  get: async ({ get }) => {
    const { data } = await getUserById({
      id: 1,
    });
    return data.name;
  },
});

function CurrentUserInfoNotSuspense() {
  const userName = useRecoilValue(currentUserNameQuery_NotSuspense);
  return <Typography>{userName}</Typography>;
}

export function MultipleRecoilRootNotSuspense() {
  return (
    <RecoilRoot>
      {/* ยังมี Suspense นอก RecoilRoot CurrentUserInfoLog*/}
      <React.Suspense fallback={<Loading />}>
        {/* 1 */}
        <RecoilRoot>
          {/* <React.Suspense fallback={<Loading />}> */}
          <CurrentUserInfoNotSuspense />
          {/* </React.Suspense> */}
        </RecoilRoot>
      </React.Suspense>
    </RecoilRoot>
  );
}
