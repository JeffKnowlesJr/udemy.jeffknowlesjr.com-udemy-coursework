<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'KKVo593SBw4qrbLaK33VzOFc52wjMq6y3WuiefIVA5ZkNerSnyZj5tCOfFD07RZsdG2z5bPxPzM/cZpiCLUuOQ==');
define('SECURE_AUTH_KEY',  'Wo7ByIXetKNNbiNCYYetyUVPaMR6PvfkI1ZVsrLDGnTqujYSrSvarK/j7z8ULCMX1f04uCcfnvbNhP6q2KgCjg==');
define('LOGGED_IN_KEY',    '02Wzxcr16rXJvzQDK3FO63Rahq6I4JKKTCqnMdRq5KJXMpPDYiNopjpRUGVKeRF/K8hnzJI1lrwDar7nKnqHAw==');
define('NONCE_KEY',        'QKBAHO4WZuqrckM7X5dsjFkBTeamV2s5BOexZa4ZYoAFrjUj2fgQK7kiVZIo2NKCbBpqGR+bzp6vh+neykj2SA==');
define('AUTH_SALT',        '1Dqk10hOY6V5uwMDaQGUYWlABLiwoTeDRv4nNxE6t1LFIZqDHGFKHncTzevB1O26n0ol0vlgp7vn3lCJYMBYiQ==');
define('SECURE_AUTH_SALT', 'PALvp9ccNAgmj2+z7d8BZROi9S7iIzzIg02yJvRm145fpYmBVmJGtKKi7oSt2tzx0VaW0UybSsZFqvNkhvv4RQ==');
define('LOGGED_IN_SALT',   'bkQhYM3m+zAO5/v+Xn899rWWYW6+bbVFQxTzewqms2KZHCXpTIipHON8uZy9qFa0LvcgNg/ZkICkVXV8oGMo1A==');
define('NONCE_SALT',       '+rAM57SI0s6mreP73oee1bWBdTcu87NU+PTSKG0uW/vdaaMUGRjr/IRkUqeQddafrsA9BST0/NRnSplYDy1C5g==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
