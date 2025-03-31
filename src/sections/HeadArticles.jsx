import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Link,
} from "@mui/material";

// Sample news articles data
const newsArticles = [
  {
    id: 1,
    title:
      "Survey finds a majority of Americans now disapprove of the job President Trump is doing",
    imageUrl: "https://source.unsplash.com/random/800x600/?politics",
    content:
      "The Yahoo News/YouGov survey shows the president's approval rating has fallen amid perceptions that he isn't prioritizing America's most important issues.",
    summary:
      "The president's approval rating has fallen amid perceptions that he isn't prioritizing America's most important issues.",
    readMoreLink: "/article/1",
  },
  {
    id: 2,
    title:
      "Trump says U.S. will 'go as far as we have to' to get control of Greenland",
    imageUrl: "https://source.unsplash.com/random/400x300/?greenland",
    content:
      "The president expressed interest in acquiring the autonomous Danish territory, citing its strategic location and natural resources.",
    readMoreLink: "/article/2",
  },
  {
    id: 3,
    title: "Woman who killed Tejano music icon Selena in 1995 denied parole",
    imageUrl: "https://source.unsplash.com/random/400x300/?music",
    content:
      "The Texas Board of Pardons and Paroles denied the parole request of Yolanda Saldívar, who was convicted of murdering the beloved singer.",
    readMoreLink: "/article/3",
  },
  {
    id: 4,
    title:
      "Musk awards voter in Wisconsin Supreme Court race $1M. Opposition calls it illegal",
    imageUrl: "https://source.unsplash.com/random/400x300/?court",
    content:
      "The tech billionaire's financial reward to a voter has sparked controversy and legal questions about election incentives.",
    readMoreLink: "/article/4",
  },
  {
    id: 5,
    title:
      "Not buying a car? Trump's tariffs will still hit your wallet, experts say",
    imageUrl: "https://source.unsplash.com/random/400x300/?car",
    content:
      "Economists warn that proposed tariffs on imported goods will have ripple effects throughout the economy, affecting consumers in unexpected ways.",
    readMoreLink: "/article/5",
  },
  {
    id: 6,
    title: "Remedy supported by RFK Jr. leaves some measles patients more ill",
    imageUrl: "https://source.unsplash.com/random/400x300/?hospital",
    content:
      "Health officials warn against alternative treatments promoted by the presidential candidate as measles cases continue to rise in several states.",
    readMoreLink: "/article/6",
  },
];

function HeadArticles() {
  // Separate the featured article (first in the array) from the rest
  const featuredArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Featured Article */}
      <Card
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <CardMedia
            component="img"
            height="400"
            image={featuredArticle.imageUrl}
            alt={featuredArticle.title}
            sx={{ height: { xs: "250px", md: "100%" }, objectFit: "cover" }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              color="primary"
              gutterBottom
            >
              {featuredArticle.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {featuredArticle.content}
            </Typography>
            <Link
              href={featuredArticle.readMoreLink}
              color="primary"
              underline="hover"
            >
              Read More »
            </Link>
          </CardContent>
        </Box>
      </Card>

      {/* Remaining Articles in a row */}
      <Grid container spacing={2}>
        {remainingArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={article.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={article.imageUrl}
                alt={article.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" component="h3" gutterBottom>
                  {article.title}
                </Typography>
                <Link
                  href={article.readMoreLink}
                  color="primary"
                  underline="hover"
                  variant="body2"
                >
                  Read more
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HeadArticles;
