import { Box, Typography, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { passwordCheck } from "../../utils/passwordChecks";
import { usePutUser } from "../../hooks/User/usePutUser/usePutUser";
import Button from "../../components/Button/Button";

const UserSection = ({ user }) => {
  const { mutate: updateUser } = usePutUser();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userForm, setUserForm] = useState({
    id: user.id,
    email: user.email,
    name: user.name,
    newPassword: "",
  });

  const handleNewPasswordChange = (value: string) => {
    setUserForm({ ...userForm, newPassword: value });
  };

  const handleConfirmPasswordChange = (value: string) => {
    if (value !== newPassword) {
      console.log("need to match");
    }
    setConfirmPassword(value);
  };

  const handleSavePasswordChange = () => {
    if (userForm.newPassword !== confirmPassword) {
      console.log("passwords not match");
    }
    if (!passwordCheck(userForm.newPassword)) {
      console.log("password not meet requirements");
    }

    updateUser(userForm);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleDetailSave = () => {
    updateUser(userForm);
  };

  return (
    <Stack sx={{ m: 2, gap: 2 }}>
      <Typography variant="h3">Your details</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography>Email</Typography>
          <TextField
            name="email"
            value={userForm.email}
            placeholder={user.email}
            type="email"
            onChange={(event) => handleChange(event)}
          />
        </Box>
        <Box>
          <Typography>Name</Typography>
          <TextField
            name="name"
            value={userForm.name}
            placeholder={user.name}
            onChange={(event) => handleChange(event)}
          />
        </Box>
        <Button
          title="Save Changes"
          onClick={handleDetailSave}
          sx={{ width: "25%" }}
        />
      </Box>

      {user.authProvider === "local" ? (
        <Typography>No linked accounts</Typography>
      ) : (
        <>
          <Typography>Linked Accounts</Typography>
          <TextField value={user.authProvider} disabled />
        </>
      )}

      <Box>
        <Box>
          <TextField
            placeholder="New Password"
            value={userForm.newPassword}
            onChange={(event) => handleNewPasswordChange(event.target.value)}
          />
          <TextField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) =>
              handleConfirmPasswordChange(event.target.value)
            }
          />
        </Box>

        <Button title="Save password" onClick={handleSavePasswordChange} />
      </Box>

      <Button title="Delete account" color="error" onClick={() => {}} />
    </Stack>
  );
};

export default UserSection;
