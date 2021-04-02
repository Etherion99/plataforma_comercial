<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 80);
            $table->string('description', 400);
            $table->foreignId('category_id')->constrained();
            $table->boolean('delivery');
            $table->string('logo_ext', 4);
            $table->timestamps();
        });
        DB::statement('ALTER TABLE companies ADD FULLTEXT search(name, description)');
    }

    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
