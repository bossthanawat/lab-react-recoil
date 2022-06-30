import { Paper, Container, Stack, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import SimpleRecoil from "pages/SimpleRecoil";
import AtomTodoList from "pages/TodoList";
import {
  OneSuspense,
  MultipleSuspense,
  WithoutSuspense,
  QueriesWithParameters,
} from "pages/AsynDataQueries";
import {
  MultipleRecoilRoot,
  MultipleRecoilRootNotSuspense,
} from "./AsynDataQueries/MultipleRecoilRoot";
import { Link as RouterLink } from "react-router-dom";
import { DataFlowGraph, DataFlowPreFetching } from "./AsynDataQueries/DataFlow";

function Home() {
  return (
    <Stack spacing={3}>
      {/* SimpleRecoil */}
      <Box>
        <Typography variant="h5">SimpleRecoil</Typography>
        <Paper sx={{ p: 2 }}>
          <SimpleRecoil />
        </Paper>
      </Box>
      {/* TodoList */}
      <Box>
        <Typography variant="h5">TodoList</Typography>
        <Paper sx={{ p: 2 }}>
          <AtomTodoList />
        </Paper>
      </Box>
      <Divider />
      {/* Asynchronous Data Queries */}
      <Box>
        <Typography variant="h5">AsynQueries</Typography>
        <Stack spacing={2}>
          {/* One Suspense */}
          <Typography variant="h6">Suspense</Typography>
          <Paper sx={{ p: 2 }}>
            <OneSuspense />
          </Paper>
          {/* Multiple Suspense */}
          <Typography variant="h6">Multiple Suspense</Typography>
          <Paper sx={{ p: 2 }}>
            <MultipleSuspense />
          </Paper>
          {/* Async Queries Without React Suspense */}
          <Typography variant="h6">
            Async Queries Without React Suspense
          </Typography>
          <Paper sx={{ p: 2 }}>
            <WithoutSuspense />
          </Paper>
          {/* Multiple RecoilRoot */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/multiple-recoilRoot"
          >
            Multiple RecoilRoot
          </Typography>
          {/* Multiple RecoilRoot Not Suspense*/}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/multiple-recoilRoot-not-suspense"
          >
            Multiple RecoilRoot Not use Suspense in children
          </Typography>
          {/* Queries with Parameters */}
          <Typography variant="h6">Queries with Parameters</Typography>
          <Paper sx={{ p: 2 }}>
            <QueriesWithParameters />
          </Paper>
          {/* QData-Flow Graph */}
          <Typography variant="h6">Data-Flow Graph</Typography>
          <Paper sx={{ p: 2 }}>
            <DataFlowGraph />
          </Paper>
          {/* QData-Flow Graph */}
          <Typography variant="h6">Pre-Fetching</Typography>
          <Paper sx={{ p: 2 }}>
            <DataFlowPreFetching />
          </Paper>
        </Stack>
      </Box>
    </Stack>
  );
}

export default Home;

export const MultipleRecoilRootPage = () => {
  return (
    <>
      <Typography variant="h6">Multiple RecoilRoot</Typography>
      <Paper sx={{ p: 2 }}>
        <MultipleRecoilRoot />
      </Paper>
    </>
  );
};

export const MultipleRecoilRootNotSuspensePage = () => {
  return (
    <>
      <Typography variant="h6">
        Multiple RecoilRoot Not use Suspense in children
      </Typography>
      <Typography>
        เข้าครั้งแรก จะอยู่ state Loading ค้าง ต้องมีการ rerender ใหม่อีกครั้ง
        (กดกลับไปหน้าก่อนหน้าแล้วค่อยกดกลับมา){" "}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <MultipleRecoilRootNotSuspense />
      </Paper>
    </>
  );
};
