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
        Schema::create('sensor_report', function (Blueprint $table) {
            $table->id();
            $table->integer('sensorID');
            $table->double('lpg_value');
            $table->double('co_value');
            $table->double('smoke_value');
            $table->double('fire_value');
            $table->date('date');
            $table->time('time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensor_report');
    }
};
