import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Link,
} from "@mui/material";

const Terms = () => {
  const companyName = "[Company Name]";
  const websiteUrl = "[https://yourwebsite.com]";
  const contactEmail = "support@yourcompany.com";
  const effectiveDate = "October 1, 2026";
  const jurisdiction = "[State/Country]";

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Terms and Conditions
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 2 }}
        >
          Effective Date: {effectiveDate}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Section 1 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            1. Agreement to Terms
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            By accessing or using {websiteUrl} ("Website") and services provided
            by {companyName} ("we," "us," or "our"), you agree to be bound by
            these Terms and Conditions. If you do not agree to all of these
            terms, you must not access or use the Website.
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            2. Intellectual Property Rights
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Unless otherwise indicated, the Website, including all code,
            software, design, text, logos, graphics, and underlying source
            material, is our proprietary property or licensed to us. All
            material is protected by copyright, trademark, and other applicable
            intellectual property laws.
          </Typography>
        </Box>

        {/* Section 3 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            3. User Accounts & Security
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            When creating an account, you agree to provide accurate, current,
            and complete information. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            that occur under your account. Notify us immediately if you suspect
            unauthorized access.
          </Typography>
        </Box>

        {/* Section 4 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            4. Prohibited Activities
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            You may not access or use the Website for any purpose other than
            that for which we make it available. As a user, you agree not to:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
            <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
              Systematically retrieve data or content to create or compile a
              collection or database without permission.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
              Circumvent, disable, or interfere with security-related features
              of the Website.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
              Engage in unauthorized framing of or linking to the Website.
            </Typography>
            <Typography component="li" variant="body1">
              Use the Website in a manner inconsistent with any applicable laws
              or regulations.
            </Typography>
          </Box>
        </Box>

        {/* Section 5 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            In no event will {companyName}, or its directors, employees, or
            agents, be liable to you or any third party for any direct,
            indirect, consequential, exemplary, incidental, or punitive damages
            arising from your use of the Website or services, even if advised of
            the possibility of such damages.
          </Typography>
        </Box>

        {/* Section 6 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            6. Governing Law
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            These terms shall be governed by and defined following the laws of{" "}
            {jurisdiction}. {companyName} and yourself irrevocably consent that
            the courts of {jurisdiction} shall have exclusive jurisdiction to
            resolve any dispute.
          </Typography>
        </Box>

        {/* Section 7 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            7. Changes to Terms
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            We reserve the right, in our sole discretion, to modify or replace
            these Terms at any time. We will notify users of changes by updating
            the "Effective Date" at the top of this page.
          </Typography>
        </Box>

        {/* Section 8 */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            8. Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            If you have questions or comments regarding these Terms and
            Conditions, please contact us at:{" "}
            <Link href={`mailto:${contactEmail}`} underline="hover">
              {contactEmail}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Terms;
