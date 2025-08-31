module.exports = function(eleventyConfig) {
    // Copy static assets to output
    // I.e. Don't process these files, just copy them as-is to the output
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/favicons");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("site.webmanifest");

    // Add date filters
    eleventyConfig.addFilter("dateIso", function(dateObj) {
        return dateObj.toISOString();
    });

    eleventyConfig.addFilter("dateReadable", function(dateObj) {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });
    
    // Set input and output directories
    return {
        dir: {
            input: "src",        // Where Eleventy looks for source files
            output: "_site",     // Where Eleventy puts the built site
            includes: "_includes", // Reusable components (like navigation)
            layouts: "_layouts"   // Page templates
        }
    };
};
