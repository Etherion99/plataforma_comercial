<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleryPhotosTable extends Migration
{
    public function up()
    {
        Schema::create('gallery_photos', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('number');
            $table->foreignId('company_id')->constrained();
            $table->string('extension', 4);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('gallery_photos');
    }
}
