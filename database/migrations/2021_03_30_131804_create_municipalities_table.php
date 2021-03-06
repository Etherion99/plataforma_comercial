<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMunicipalitiesTable extends Migration
{
    public function up()
    {
        Schema::create('municipalities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 28);
            $table->foreignId('department_id')->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('municipalities');
    }
}
