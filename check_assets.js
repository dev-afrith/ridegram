const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const issues = [];

const checkPathExists = (file, relativePath) => {
    // Ignore URL params or hashes
    const cleanPath = relativePath.split('?')[0].split('#')[0];
    if (cleanPath.startsWith('http') || cleanPath.startsWith('mailto') || cleanPath.startsWith('tel') || cleanPath.startsWith('data:')) {
        return;
    }
    const absolutePath = path.resolve(dir, cleanPath);
    if (!fs.existsSync(absolutePath)) {
        issues.push(`File: ${file} | Broken link: ${relativePath}`);
    }
};

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check href attributes
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        checkPathExists(file, match[1]);
    }

    // Check src attributes
    const srcRegex = /src=["']([^"']+)["']/g;
    while ((match = srcRegex.exec(content)) !== null) {
        checkPathExists(file, match[1]);
    }
});

const jsFiles = fs.readdirSync(path.join(dir, 'js')).filter(f => f.endsWith('.js'));
jsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, 'js', file), 'utf8');
    try {
        new Function(content); // Basic syntax check
    } catch (e) {
        issues.push(`JS Syntax Error in ${file}: ${e.message}`);
    }
});

console.log("Issues found:\n" + issues.join("\n"));
if (issues.length === 0) {
    console.log("No broken links or syntax errors found!");
}
