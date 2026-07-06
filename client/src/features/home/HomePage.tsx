import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link as RouterLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Premium Refurbished Electronics",
    subtitle: "Save up to 70% on certified phones, laptops and accessories.",
    image: "/images/laptops.png",
  },
  {
    title: "Sell Your Device",
    subtitle: "Turn your old device into cash in minutes.",
    image: "/images/phones.png",
  },
  {
    title: "Summer Tech Deals",
    subtitle: "Discover amazing discounts on top brands.",
    image: "/images/tablets.png",
  },
];

const categoryCards = [
  {
    title: "Shop by Category",
    items: [
      { name: "Phones", image: "/images/phones.png" },
      { name: "Laptops", image: "/images/laptops.png" },
      { name: "Tablets", image: "/images/tablets.png" },
      { name: "Accessories", image: "/images/accessories.jpeg" },
    ],
  },
  {
    title: "Our Top Picks",
    items: [
      { name: "MacBook Deals", image: "/images/macbook-deals.png" },
      { name: "iPhone Deals", image: "/images/iphones-deals.jpeg" },
    ],
  },
  {
    title: "Deals Under Budget",
    items: [
      { name: "Under $50", image: "/images/under-50.png" },
      { name: "Under $100", image: "/images/under-100.png" },
      { name: "Under $150", image: "/images/under-150.jpeg" },
      { name: "Under $200", image: "/images/under-200.jpeg" },
    ],
  },
  {
    title: "Featured Promo",
    promo: true,
  },
];

const trustItems = [
  { icon: "🚚", title: "Free Shipping", text: "On selected orders" },
  { icon: "🔄", title: "30-Day Returns", text: "Hassle-free returns" },
  { icon: "🛡️", title: "1-Year Warranty", text: "Certified protection" },
  { icon: "🔒", title: "Secure Payment", text: "100% secure checkout" },
];

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, pt: 3 }}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000 }}
          loop
          navigation
          pagination={{ clickable: true }}
          style={{ borderRadius: "24px", overflow: "hidden" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <Box
                sx={{
                  height: { xs: 360, md: 430 },
                  backgroundImage: `
linear-gradient(to right, rgba(0,0,0,.75), rgba(0,0,0,.35), rgba(0,0,0,.08)),
url(${slide.image})
`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  px: { xs: 4, md: 10 },
                }}
              >
                <Box sx={{ color: "white", maxWidth: 650 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "2.7rem", md: "4.7rem" },
                      fontWeight: 900,
                      lineHeight: 1.02,
                      mb: 2,
                    }}
                  >
                    {slide.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    {slide.subtitle}
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <Button
                      component={RouterLink}
                      to="/catalog"
                      variant="contained"
                      sx={{
                        borderRadius: 50,
                        px: 5,
                        py: 1.4,
                        fontWeight: 900,
                        textTransform: "none",
                        bgcolor: "#f7c948",
                        color: "#111",
                        "&:hover": { bgcolor: "#ffd95c" },
                      }}
                    >
                      Shop Now
                    </Button>

                    <Button
                      component={RouterLink}
                      to="/about"
                      variant="outlined"
                      sx={{
                        borderRadius: 50,
                        px: 5,
                        py: 1.4,
                        fontWeight: 900,
                        textTransform: "none",
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: "rgba(255,255,255,.12)",
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
                      mt: 3,
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
          {categoryCards.map((section) => (
            <Grid item xs={12} md={3} key={section.title}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 15px 35px rgba(0,0,0,.08)",
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography fontWeight={900}>{section.title}</Typography>
                    <Typography
                      component={RouterLink}
                      to="/catalog"
                      sx={{
                        color: "#1565c0",
                        fontSize: ".85rem",
                        textDecoration: "none",
                        fontWeight: 800,
                      }}
                    >
                      View all
                    </Typography>
                  </Stack>

                  {section.promo ? (
                    <Box
                      sx={{
                        height: 260,
                        borderRadius: 3,
                        bgcolor: "#ffa322",
                        color: "white",
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h4" fontWeight={900}>
                        Big Tech Deals
                      </Typography>
                      <Typography sx={{ my: 2 }}>
                        Save more on certified refurbished electronics.
                      </Typography>
                      <Button
                        component={RouterLink}
                        to="/catalog"
                        variant="contained"
                        sx={{
                          bgcolor: "white",
                          color: "#111",
                          borderRadius: 50,
                          fontWeight: 900,
                          width: 140,
                          "&:hover": { bgcolor: "#f1f1f1" },
                        }}
                      >
                        Shop now
                      </Button>
                    </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {section.items?.map((item) => (
                        <Grid item xs={6} key={item.name}>
                          <Box
                            component={RouterLink}
                            to="/catalog"
                            sx={{
                              display: "block",
                              textDecoration: "none",
                              color: "#111",
                            }}
                          >
                            <Box
                              sx={{
                                height: 110,
                                borderRadius: 3,
                                bgcolor: "#f4f6f8",
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                mb: 1,
                              }}
                            />
                            <Typography
                              sx={{
                                textAlign: "center",
                                fontSize: ".85rem",
                                fontWeight: 700,
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {trustItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 12px 30px rgba(0,0,0,.07)",
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 34 }}>{item.icon}</Typography>
                  <Typography fontWeight={900}>{item.title}</Typography>
                  <Typography color="text.secondary">{item.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
