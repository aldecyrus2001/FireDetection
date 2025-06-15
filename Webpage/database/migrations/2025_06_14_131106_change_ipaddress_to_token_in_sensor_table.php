<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sensor', function (Blueprint $table) {
            $table->renameColumn('ipaddress', 'token');
        });

        Schema::table('sensor', function (Blueprint $table) {
            $table->string('token', 200)->change(); // Change the length to 200
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sensor', function (Blueprint $table) {
            $table->renameColumn('token', 'ipaddress');
        });

        Schema::table('sensor', function (Blueprint $table) {
            $table->string('ipaddress')->change(); // Revert back to default length
        });
    }
};
