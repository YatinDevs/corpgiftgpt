# ecommerce-backend

> bash

-   composer create-project laravel/laravel ecommerce-backend

-   cd ecommerce-backend

> bash

SETTING UP Sanctum

# Install all required packages with correct versions

composer require laravel/sanctum guzzlehttp/guzzle
composer require spatie/laravel-medialibrary:^10.0 --ignore-platform-req=ext-exif

1.  Install Compatible Versions

    bash

            composer require spatie/laravel-medialibrary:^13.0 laravel/sanctum:^4.0 guzzlehttp/guzzle:^7.0

2.  Why These Versions?

        Package Version Reason
        spatie/laravel-medialibrary       ^13.0      Specifically supports Laravel 12
        laravel/sanctum                   ^4.0       Current stable for Laravel 12
        guzzlehttp/guzzle                 ^7.0       Standard HTTP client

composer require spatie/laravel-queueable-action
