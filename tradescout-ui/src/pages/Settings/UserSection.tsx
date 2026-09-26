import { Box, Typography, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { passwordCheck } from "../../utils/passwordChecks";
import { usePutUser } from "../../hooks/User/usePutUser/usePutUser";
import Button from "../../components/Button/Button";

const UserSection = ({ user }) => {
  const { mutate: updateUser } = usePutUser();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [userForm, setUserForm] = useState({
    id: user.id,
    email: user.email || "",
    name: user.name || "",
    newPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleDetailSave = () => {
    // Only send name and email
    updateUser({ id: userForm.id, email: userForm.email, name: userForm.name });
  };

  const handleSavePasswordChange = () => {
    setPasswordError(""); // Reset error state

    if (userForm.newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (!passwordCheck(userForm.newPassword)) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // Only send the password update
    updateUser({ id: userForm.id, newPassword: userForm.newPassword });

    // Clear fields after saving
    setUserForm({ ...userForm, newPassword: "" });
    setConfirmPassword("");
  };

  return (
    <Stack spacing={4}>
      {/* --- PROFILE DETAILS --- */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 400, mt: 2 }}>
          <TextField
            label="Email"
            name="email"
            value={userForm.email}
            type="email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Name"
            name="name"
            value={userForm.name}
            onChange={handleChange}
            fullWidth
          />
          <Box>
            <Button title="Save Changes" onClick={handleDetailSave} />
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* --- PASSWORD & SECURITY --- */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Security
        </Typography>

        {user.authProvider !== "local" ? (
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            You log in using <b>{user.authProvider}</b>. Password changes are
            managed by your provider.
          </Typography>
        ) : (
          <Stack spacing={3} sx={{ maxWidth: 400, mt: 2 }}>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={userForm.newPassword}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              fullWidth
            />
            <Box>
              <Button
                title="Update Password"
                onClick={handleSavePasswordChange}
              />
            </Box>
          </Stack>
        )}
      </Box>

      <Divider />

      {/* --- DANGER ZONE --- */}
      <Box>
        <Typography variant="h6" color="error" gutterBottom>
          Danger Zone
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Once you delete your account, there is no going back. Please be
          certain.
        </Typography>
        <Button title="Delete Account" color="error" onClick={() => {}} />
      </Box>
    </Stack>
  );
};

export default UserSection;
