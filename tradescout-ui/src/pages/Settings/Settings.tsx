import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useGetUser } from "../../hooks/useGetUser/useGetUser";
import { Delete, Edit } from "@mui/icons-material";

const Settings = () => {
  const { data: user, isFetching } = useGetUser();

  if (isFetching) {
    return <CircularProgress />;
  }

  console.log(user);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="h3">Your details</Typography>
          <Typography>Email</Typography>
          <TextField value={user.email} />
          <Typography>Name</Typography>
          <TextField value={user.name} />

          {/* linked accounts */}

          <Typography>Change Password</Typography>
          <TextField placeholder="current password" />
          <TextField placeholder="new password" />
          <Button>Save</Button>
        </Box>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Typography variant="h3">Business details</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Tax reference</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>
                    <TextField value={business.name} />
                  </TableCell>
                  <TableCell>
                    <TextField value={business.taxReference} />
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
