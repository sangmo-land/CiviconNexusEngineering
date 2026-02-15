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
        Schema::create('site_work_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_work_log_id')->constrained()->onDelete('cascade');
            $table->string('material_name');
            $table->decimal('quantity', 10, 2);
            $table->string('unit'); // e.g., bags, tons, cubic meters, pieces
            $table->decimal('unit_cost', 12, 2)->nullable();
            $table->string('supplier')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_work_materials');
    }
};
