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
import { currentUserIDState, Loading } from ".";



// MultipleRecoilRoot
// ดู log count
// log count จะเท่ากับ 1 ถึงแม้จะมีหลาย RecoilRoot แต่เรียกใช้ currentUserNameQueryLog ตัวเดียวกัน โดย default https://recoiljs.org/docs/api-reference/core/RecoilRoot/ 

// เมื่อใช้ useRecoilValue
// ถ้าไม่ใส่ Suspense จะหน้าขาวรอจนกว่าจะเสร็จ
// ถ้า RecoilRoot ย่อยไม่ใส่ Suspense จะติด Suspense ตัวนอกไม่คืนค่าเลย (Loading... ตลอดไป)

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