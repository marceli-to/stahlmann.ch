<?php

use Valet\Drivers\ValetDriver;

/**
 * Herd/Valet driver: serves the static Astro build from dist/ (run `npm run build` first).
 * Local development only – not part of the deployed site.
 */
class LocalValetDriver extends ValetDriver
{
    public function serves(string $sitePath, string $siteName, string $uri): bool
    {
        return is_file($sitePath.'/astro.config.mjs');
    }

    public function isStaticFile(string $sitePath, string $siteName, string $uri): string|false
    {
        $path = $sitePath.'/dist'.rawurldecode(parse_url($uri, PHP_URL_PATH) ?? '/');

        if (is_file($path)) {
            return $path;
        }

        if (is_file(rtrim($path, '/').'/index.html')) {
            return rtrim($path, '/').'/index.html';
        }

        return false;
    }

    public function frontControllerPath(string $sitePath, string $siteName, string $uri): ?string
    {
        // Herd never runs isStaticFile() for "/", so the homepage lands here
        if (($staticFile = $this->isStaticFile($sitePath, $siteName, $uri)) !== false) {
            return $staticFile;
        }

        http_response_code(404);

        return is_file($sitePath.'/dist/404.html') ? $sitePath.'/dist/404.html' : null;
    }
}
