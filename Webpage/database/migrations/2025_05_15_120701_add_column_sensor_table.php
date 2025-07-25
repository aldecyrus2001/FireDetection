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
            $table->dateTime('last_seen')->nullable();
            $table->string('status');
            $table->boolean('isAlert')->default('0');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sensor', function (Blueprint $table) {
            $table->dropColumn('last_seen');
            $table->dropColumn('status');
            $table->dropColumn('isAlert');
        });
    }
};
