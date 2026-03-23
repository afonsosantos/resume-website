# resume-website

Static assets (`css`, `js`, `img`, `doc`) live under `src/` and are exposed in production through the root `.htaccess`. The rewrite explicitly maps incoming requests to the `src` directory so hosts like cPanel, which often seed placeholder folders at the web root, still serve the files without duplicating directories during deployment.
