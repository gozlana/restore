import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: "#f8fbff", minHeight: "100vh", pt: 6, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                color: "#0b63f6",
                fontWeight: 800,
                letterSpacing: 1,
                mb: 1,
              }}
            >
              ABOUT US
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#071b52",
                mb: 3,
                fontSize: { xs: "2.4rem", md: "4rem" },
              }}
            >
              About Restore
            </Typography>

            <Typography
              sx={{
                color: "#374151",
                fontSize: { xs: "1.05rem", md: "1.25rem" },
                lineHeight: 1.8,
                maxWidth: 520,
                mb: 4,
              }}
            >
              Restore is more than just a store — it&apos;s a better way to shop.
              We bring you quality products at great prices with an experience
              you can trust.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{
                bgcolor: "#1155dd",
                px: 4,
                py: 1.4,
                borderRadius: 2,
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "0 10px 24px rgba(17,85,221,.25)",
                "&:hover": { bgcolor: "#0d47c7" },
              }}
            >
              Shop Now
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: { xs: 280, md: 430 },
                borderRadius: 6,
                background:
                  "radial-gradient(circle at center, #dbeafe 0%, #eef6ff 55%, #ffffff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 0 80px rgba(37,99,235,.12)",
              }}
            >
              <ShoppingBagOutlinedIcon
                sx={{
                  fontSize: { xs: 150, md: 250 },
                  color: "#1459e6",
                  filter: "drop-shadow(0 18px 18px rgba(20,89,230,.25))",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Mission */}
        <Box textAlign="center" sx={{ mt: 8, mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "#071b52", mb: 2 }}
          >
            Our Mission
          </Typography>

          <Typography
            sx={{
              color: "#4b5563",
              fontSize: "1.15rem",
              maxWidth: 780,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Our mission is simple: to offer high-quality products, exceptional
            service, and a seamless shopping experience — every time.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={3}>
          {[
            {
              icon: <LocalShippingIcon />,
              title: "Fast Shipping",
              text: "We offer fast and reliable shipping so you can enjoy your products sooner.",
            },
            {
              icon: <SecurityIcon />,
              title: "Secure Payments",
              text: "Your security is our priority. We use encrypted payments to keep your information safe.",
            },
            {
              icon: <WorkspacePremiumIcon />,
              title: "Premium Quality",
              text: "We carefully select products that meet our high standards for quality and durability.",
            },
            {
              icon: <SupportAgentIcon />,
              title: "Customer Support",
              text: "Our support team is here to help you. Your satisfaction matters to us.",
            },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid #e5eaf3",
                  boxShadow: "0 14px 35px rgba(15,23,42,.08)",
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    bgcolor: "#eaf2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1459e6",
                    mb: 2,
                    "& svg": { fontSize: 36 },
                  }}
                >
                  {item.icon}
                </Box>

                <Typography sx={{ fontWeight: 900, mb: 1, color: "#111827" }}>
                  {item.title}
                </Typography>

                <Typography sx={{ color: "#4b5563", lineHeight: 1.7 }}>
                  {item.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Thank you banner */}
        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: "#eaf2ff",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ fontSize: 56, color: "#1459e6" }} />

          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: "#071b52", mb: 1 }}
            >
              Thanks for choosing Restore!
            </Typography>

            <Typography sx={{ color: "#374151", fontSize: "1rem" }}>
              We&apos;re grateful for your trust and look forward to being part
              of your shopping journey.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
