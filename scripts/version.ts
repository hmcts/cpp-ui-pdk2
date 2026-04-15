const fs = require('fs');
const path = require('path');

const scopePath = path.join(__dirname, '../dist/@cpp');
const projects = fs.readdirSync(scopePath);

for (const project of projects) {
  const pathToPackageJson = `${scopePath}/${project}/package.json`;
  const packageJson = fs.readFileSync(pathToPackageJson, 'utf8');
  const injectedPackageJson = packageJson.replace(
    /0.0.0-PLACEHOLDER/g,
    process.env.npm_package_version
  );

  fs.writeFile(pathToPackageJson, injectedPackageJson, err => {
    if (err) {
      console.log(err);
    }
    console.log(`Writing version.ts to ${pathToPackageJson}`);
  });
}
