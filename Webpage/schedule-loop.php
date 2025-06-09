<?php

while (true) {
    echo "[" . date('H:i:s') . "] Running Laravel scheduler...\n";
    shell_exec('php artisan schedule:run');
    sleep(60);
}