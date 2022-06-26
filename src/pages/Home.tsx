import { Paper, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SimpleRecoil from "pages/SimpleRecoil";
import AtomTodoList from "pages/TodoList";
import {
  OneSuspense,
  MultipleSuspense,
  WithoutSuspense,
  QueriesWithParameters,
} from "pages/AsynDataQueries";
import { MultipleRecoilRoot } from "./AsynDataQueries/MultipleRecoilRoot";

function Home() {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h3">Recoil</Typography>
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
            <Typography variant="h6">Multiple RecoilRoot</Typography>
            <Paper sx={{ p: 2 }}>
              <MultipleRecoilRoot />
            </Paper>
            {/* Queries with Parameters */}
            <Typography variant="h6">Queries with Parameters</Typography>
            <Paper sx={{ p: 2 }}>
              <QueriesWithParameters />
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default Home;
