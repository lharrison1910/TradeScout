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
import { Delete, Edit, Save } from "@mui/icons-material";
import { useState } from "react";
import { passwordCheck } from "../../utils/passwordChecks";

const Settings = () => {
  const { data: user, isFetching } = useGetUser();

  const [businessRowLock, setBusinessRowLock] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    if (value !== newPassword) {
      console.log("need to match");
    }
    setConfirmPassword(value);
  };

  const handleSavePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      console.log("passwords not match");
    }
    if (!passwordCheck(newPassword)) {
      console.log("password not meet requirements");
    }

    //send request
  };

  if (isFetching) {
    return <CircularProgress />;
  }

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
          <TextField
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => handleNewPasswordChange(event.target.value)}
          />
          <TextField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) =>
              handleConfirmPasswordChange(event.target.value)
            }
          />
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
                    <TextField
                      value={business.name}
                      disabled={businessRowLock !== business.id}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={business.taxReference}
                      disabled={businessRowLock !== business.id}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setBusinessRowLock(business.id)}>
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
