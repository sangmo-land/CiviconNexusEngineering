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
        Schema::create('site_work_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->date('work_date');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->text('work_description');
            $table->text('difficulties')->nullable();
            $table->string('weather_conditions')->nullable();
            $table->text('safety_notes')->nullable();
            $table->text('additional_notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_work_logs');
    }
};
