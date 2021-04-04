<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSocialLinksTable extends Migration
{
    public function up()
    {
        Schema::create('social_links', function (Blueprint $table) {
            $table->id();
            $table->string('url', 88);
            $table->foreignId('social_network_id')->constrained();
            $table->foreignId('company_id')->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('social_links');
    }
}
