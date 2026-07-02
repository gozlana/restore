import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function ContactPage() {
  const infoCards = [
    {
      icon: <EmailOutlinedIcon />,
      title: "Email Us",
      main: "support@restore.com",
      text: "We’re happy to answer your questions.",
    },
    {
      icon: <PhoneOutlinedIcon />,
      title: "Call Us",
      main: "(555) 123-4567",
      text: "Mon - Fri, 9:00 AM - 6:00 PM",
    },
    {
      icon: <LocationOnOutlinedIcon />,
      title: "Visit Us",
      main: "123 Restore Way",
      text: "Phoenix, AZ 85001, USA",
    },
    {
      icon: <AccessTimeOutlinedIcon />,
      title: "Business Hours",
      main: "Mon - Fri: 9 AM - 6 PM",
      text: "Saturday: 10 AM - 4 PM",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f8fbff", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 8 } }}>
        {/* HERO */}
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: "#1459e6", fontWeight: 900, mb: 1 }}>
              CONTACT US
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#071b52",
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 2,
              }}
            >
              We’re Here to Help
            </Typography>

            <Typography
              sx={{
                color: "#374151",
                fontSize: "1.15rem",
                lineHeight: 1.8,
                maxWidth: 520,
                mb: 4,
              }}
            >
              Have a question, need assistance, or want to share feedback? Send
              us a message and we’ll get back to you as soon as possible.
            </Typography>

            <Grid container spacing={2}>
              {[
                ["Fast Response", "We reply within 24 hours", <SecurityOutlinedIcon />],
                ["Real Support", "Talk to our friendly team", <SupportAgentOutlinedIcon />],
                ["Your Privacy", "Your information stays safe", <SecurityOutlinedIcon />],
              ].map(([title, text, icon]) => (
                <Grid item xs={12} sm={4} key={title as string}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 1,
                        borderRadius: "50%",
                        bgcolor: "#eaf2ff",
                        color: "#1459e6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& svg": { fontSize: 32 },
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography sx={{ fontWeight: 900, color: "#071b52" }}>
                      {title}
                    </Typography>
                    <Typography sx={{ color: "#4b5563", fontSize: ".9rem" }}>
                      {text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: { xs: 300, md: 430 },
                borderRadius: 6,
                background:
                  "radial-gradient(circle, #dbeafe 0%, #eef6ff 55%, #ffffff 100%)",
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

        {/* FORM + INFO */}
        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                border: "1px solid #e5eaf3",
                boxShadow: "0 16px 40px rgba(15,23,42,.08)",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#071b52", mb: 1 }}>
                Send Us a Message
              </Typography>

              <Typography sx={{ color: "#4b5563", mb: 3 }}>
                Fill out the form below and we’ll get back to you.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Your Name" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth select label="Subject" defaultValue="">
                    <MenuItem value="">Select a subject</MenuItem>
                    <MenuItem value="order">Order Support</MenuItem>
                    <MenuItem value="shipping">Shipping Question</MenuItem>
                    <MenuItem value="return">Returns</MenuItem>
                    <MenuItem value="general">General Question</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    label="Your Message"
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SendOutlinedIcon />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 900,
                  textTransform: "none",
                  bgcolor: "#1459e6",
                  boxShadow: "0 12px 24px rgba(20,89,230,.25)",
                  "&:hover": {
                    bgcolor: "#0f49c7",
                  },
                }}
              >
                Send Message
              </Button>

              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: ".9rem",
                }}
              >
                We never share your information with anyone.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              {infoCards.map((card) => (
                <Grid item xs={12} key={card.title}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid #e5eaf3",
                      boxShadow: "0 12px 30px rgba(15,23,42,.07)",
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#eaf2ff",
                        color: "#1459e6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& svg": { fontSize: 32 },
                      }}
                    >
                      {card.icon}
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 900, color: "#071b52" }}>
                        {card.title}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: "#1459e6" }}>
                        {card.main}
                      </Typography>
                      <Typography sx={{ color: "#4b5563" }}>{card.text}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* HELP BANNER */}
        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: "#eaf2ff",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SupportAgentOutlinedIcon sx={{ fontSize: 56, color: "#1459e6" }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#071b52" }}>
                Need immediate help?
              </Typography>
              <Typography sx={{ color: "#4b5563" }}>
                Check out our FAQs or chat with our support team.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.2,
              fontWeight: 900,
              textTransform: "none",
              borderColor: "#1459e6",
              color: "#1459e6",
            }}
          >
            Visit Help Center
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
