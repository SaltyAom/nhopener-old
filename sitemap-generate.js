require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./src/sitemap.jsx").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://opener.mystiar.com")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();