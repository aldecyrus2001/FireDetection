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
        Schema::table('sensor_data', function (Blueprint $table) {
            $table->dropColumn('value');
            $table->double('lpg_value')->after('sensorID');
            $table->double('co_value')->after('lpg_value');
            $table->double('smoke_value')->after('co_value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sensor_data', function (Blueprint $table) {
            $table->dropColumn(['lpg_value', 'co_value', 'smoke_value']);
            $table->double('value')->after('sensorID');
        });
    }
};
