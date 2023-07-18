/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
  // next.js config
  env: {
    access_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmRhYjFjZmNkNTQ5MmRiNGQzZGIwODNhNWViMjA2MiIsInN1YiI6IjYwNjE5MDg3MWI3YzU5MDAyODg3MWFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gP9q9x7KktjonrPL0l5H1pE2lm05ddi4u2b-y_l7UFc",
  },
});
