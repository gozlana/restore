import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Premium Refurbished Electronics",
    subtitle: "Save up to 70% on certified phones, laptops and accessories.",
    image: "/images/hero1.jpg",
  },
  {
    title: "Sell Your Device",
    subtitle: "Turn your old device into cash in minutes.",
    image: "/images/hero2.jpg",
  },
  {
    title: "Summer Tech Deals",
    subtitle: "Discover amazing discounts on top brands.",
    image: "/images/hero3.jpg",
  },
];

const trustItems = [
  { icon: "🚚", title: "Free Shipping", text: "Fast delivery on selected orders" },
  { icon: "🔄", title: "30-Day Returns", text: "Easy returns with no stress" },
  { icon: "🛡️", title: "1-Year Warranty", text: "Certified refurbished protection" },
  { icon: "⭐", title: "Top Rated", text: "Trusted by happy customers" },
];

const categories = [
  { title: "Phones", image: "/images/phones.jpg" },
  { title: "Laptops", image: "/images/laptops.jpg" },
  { title: "Accessories", image: "/images/accessories.jpg" },
];

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#1627c9", minHeight: "100vh", pb: 2 }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 1.5, md: 2, lg: 8 }, pt: 5 }}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000 }}
          loop
          navigation
          pagination={{ clickable: true }}
          style={{ borderRadius: "28px", overflow: "hidden" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <Box
                sx={{
                  height: { xs: 420, md: 600 },
                  position: "relative",
                  backgroundImage: `
linear-gradient(
to right,
rgba(0,0,0,.78),
rgba(0,0,0,.42),
rgba(0,0,0,.08)
),
url(${slide.image})
`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    maxWidth: 720,
                    pl: { xs: 4, md: 10 },
                    pr: 3,
                    color: "white",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "2.7rem", md: "5rem" },
                      fontWeight: 900,
                      lineHeight: 1.02,
                      mb: 3,
                      textShadow: "0 8px 28px rgba(0,0,0,.45)",
                    }}
                  >
                    {slide.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1.35rem" },
                      maxWidth: 560,
                      mb: 4,
                      opacity: 0.96,
                      fontWeight: 500,
                    }}
                  >
                    {slide.subtitle}
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        borderRadius: 50,
                        px: 5,
                        py: 1.6,
                        fontWeight: 800,
                        textTransform: "none",
                        bgcolor: "#f7c948",
                        color: "#111",
                        boxShadow: "0 14px 35px rgba(247,201,72,.35)",
                        "&:hover": { bgcolor: "#ffd95c" },
                      }}
                    >
                      Shop Now
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderRadius: 50,
                        px: 5,
                        py: 1.6,
                        fontWeight: 800,
                        textTransform: "none",
                        color: "white",
                        borderColor: "rgba(255,255,255,.8)",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: "rgba(255,255,255,.1)",
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{
                      mt: 4,
                      flexWrap: "wrap",
                      fontWeight: 700,
                      opacity: 0.95,
                    }}
                  >
                    <Typography>✓ Free Shipping</Typography>
                    <Typography>✓ 30-Day Returns</Typography>
                    <Typography>✓ 1-Year Warranty</Typography>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {trustItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 5,
                  bgcolor: "rgba(255,255,255,.95)",
                  boxShadow: "0 18px 45px rgba(0,0,0,.18)",
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 34, mb: 1 }}>{item.icon}</Typography>
                  <Typography variant="h6" fontWeight={900}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              mb: 3,
            }}
          >
            Shop by Category
          </Typography>

          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} md={4} key={category.title}>
                <Card
                  sx={{
                    height: 300,
                    borderRadius: 6,
                    overflow: "hidden",
                    position: "relative",
                    backgroundImage: `
linear-gradient(to top, rgba(0,0,0,.75), transparent),
url(${category.image})
`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 22px 50px rgba(0,0,0,.25)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 28,
                      left: 28,
                      color: "white",
                    }}
                  >
                    <Typography variant="h4" fontWeight={900}>
                      {category.title}
                    </Typography>
                    <Button
                      sx={{
                        mt: 1.5,
                        color: "#f7c948",
                        fontWeight: 800,
                        textTransform: "none",
                      }}
                    >
                      Explore →
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 7 },
            borderRadius: 7,
            bgcolor: "rgba(255,255,255,.96)",
            boxShadow: "0 25px 60px rgba(0,0,0,.22)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              mb: 2,
            }}
          >
            Certified Tech. Better Prices.
          </Typography>

          <Typography
            sx={{
              maxWidth: 760,
              mx: "auto",
              color: "text.secondary",
              fontSize: "1.1rem",
              mb: 4,
            }}
          >
            Restore helps you buy quality refurbished electronics with confidence,
            warranty protection, and serious savings.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 50,
              px: 6,
              py: 1.7,
              fontWeight: 900,
              textTransform: "none",
              bgcolor: "#111827",
              "&:hover": { bgcolor: "#000" },
            }}
          >
            Start Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
