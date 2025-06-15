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
        Schema::create('sensor_thresholds', function (Blueprint $table) {
            $table->id();
            $table->integer('co_value');
            $table->integer('lpg_value');
            $table->integer('smoke_value');
            $table->integer('fire_value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensor_thresholds');
    }
};
