import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableFooter,
  CircularProgress,
  Paper,
  Divider,
  Stack,
  Container,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth/useAuth";
import Button from "../../components/Button/Button";
import BusinessModal from "../../components/BusinessModal/BusinessModal";
import type { Business } from "../../types/Business";

// import {
//   useDeleteBusiness,
//   usePutBusiness,
//   usePostBusiness,
// } from "../../hooks/useBusiness";
// import Button from "../Button/Button";
// import BusinessModal from "../BusinessModal/BusinessModal";
// Replace this with your actual password check utility
const passwordCheck = (pwd: string) => pwd.length >= 8;

const Settings = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Stack spacing={4}>
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}
        >
          <UserSection user={user} />
        </Paper>

        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}
        >
          <BusinessSection businesses={user.businesses} />
        </Paper>
      </Stack>
    </Container>
  );
};

const UserSection = ({ user }) => {
  // const { mutate: updateUser } = usePutUser();

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
    // updateUser({ id: userForm.id, email: userForm.email, name: userForm.name });
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
    // updateUser({ id: userForm.id, newPassword: userForm.newPassword });

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

const BusinessSection = ({ businesses }: { businesses: Business[] }) => {
  // const { mutate: deleteBusiness } = useDeleteBusiness();
  // const { mutate: putBusiness } = usePutBusiness();
  // const { mutate: postBusiness } = usePostBusiness();

  const [modal, setModal] = useState<boolean>(false);
  const [form, setForm] = useState<Business | null>(null);

  const handleEdit = (businessId: string) => {
    setForm(businesses.find((business) => business.id === Number(businessId)));
    setModal(true);
  };

  const handleAddNew = () => {
    setForm(undefined);
    setModal(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">My Businesses</Typography>
        <Button title="Add Business" onClick={handleAddNew} />
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Business Name</TableCell>
            <TableCell>Tax Reference</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {businesses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ py: 3, color: "text.secondary" }}
              >
                No businesses added yet.
              </TableCell>
            </TableRow>
          ) : (
            businesses.map((business: Business) => (
              <TableRow key={business.id} hover>
                <TableCell>{business.businessName}</TableCell>
                <TableCell>{business.taxReference || "N/A"}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleEdit(`${business.id}`)}
                    size="small"
                    color="primary"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    // onClick={() => deleteBusiness(business.id)}
                    size="small"
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <BusinessModal
        open={modal}
        handleClose={() => setModal(false)}
        data={form}
        handleSave={undefined} // handleSave={form ? putBusiness : postBusiness}
      />
    </Box>
  );
};

export default Settings;
