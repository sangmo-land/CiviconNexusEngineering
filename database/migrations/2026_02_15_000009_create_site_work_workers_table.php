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
        Schema::create('site_work_workers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_work_log_id')->constrained()->onDelete('cascade');
            $table->string('worker_name');
            $table->string('role')->nullable(); // e.g., Mason, Carpenter, Laborer
            $table->decimal('hours_worked', 5, 2)->nullable();
            $table->text('tasks_performed')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_work_workers');
    }
};
