import { execFile } from "child_process";

/**
 * Sanitizes package name to prevent command injection
 * @param {string} packageName - npm package name
 * @returns {string} Sanitized package name or throws error
 */
export function sanitizePackageName(packageName) {
  // Validation based on npm package naming rules
  // https://github.com/npm/validate-npm-package-name
  
  // More strict regular expression that rejects uppercase names and empty content
  const validPackageNameRegex = /^(?:@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*$/;
  
  if (!validPackageNameRegex.test(packageName)) {
    throw new Error("Invalid package name");
  }
  
  // Check for dangerous characters and spaces
  if (/[;&|`$><!\\]|\s/.test(packageName)) {
    throw new Error("Package name contains forbidden characters");
  }
  
  return packageName;
}

/**
 * Get information about an npm package
 * @param {string} packageName - npm package name
 * @returns {Promise<Object>} Package information
 */
export async function getNpmPackageInfo({ packageName }) {
    // Sanitize the package name before using it
    const sanitizedPackageName = sanitizePackageName(packageName);
    
    // Execute npm view command to get package information
    const output = execFile('npm', ['view', sanitizedPackageName], {
        encoding: "utf-8",
    });

    return new Promise((resolve, reject) => {
        output.stdout.on('data', (data) => {
            resolve(data);
        });

        output.stderr.on('data', (data) => {
            reject(data);
        });

        output.on('close', (code) => {
            if (code === 0) {
                resolve({
                    content: [
                        {
                            type: "text",
                            text: output
                        },
                    ],
                });
            } else {
                reject(new Error(`npm view ${sanitizedPackageName} failed with code ${code}`));
            }
        });
    });
}