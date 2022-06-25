import { Paper, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SimpleRecoil from "pages/SimpleRecoil";
import AtomTodoList from "pages/TodoList";

function App() {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h3">Recoil</Typography>
        {/* SimpleRecoil */}
        <Box>
          <Typography variant="h6">SimpleRecoil</Typography>
          <Paper sx={{ p: 2 }}>
            <SimpleRecoil />
          </Paper>
        </Box>
        {/* TodoList */}
        <Box>
          <Typography variant="h6">
           TodoList
          </Typography>
          <Paper sx={{ p: 2 }}>
            <AtomTodoList />
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
