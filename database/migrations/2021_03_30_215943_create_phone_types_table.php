<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhoneTypesTable extends Migration
{
    public function up()
    {
        Schema::create('phone_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 28);
            $table->string('icons', 88);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('phone_types');
    }
}
