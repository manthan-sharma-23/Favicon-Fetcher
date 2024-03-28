const cheerio = require('cheerio');

async function getFavicon(url, callback) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch page');
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        const faviconUrl = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
        callback(faviconUrl);
    } catch (error) {
        console.error("Error:", error);
        callback(null);
    }
}

// Example usage:
const url = "https://www.youtube.com";
getFavicon(url, function(faviconUrl) {
    if (faviconUrl) {
        console.log("Favicon URL:", faviconUrl);
        // Do something with the favicon URL
    } else {
        console.log("No favicon found for", url);
    }
});
