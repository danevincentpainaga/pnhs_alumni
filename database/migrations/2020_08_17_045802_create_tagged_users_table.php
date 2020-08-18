<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaggedUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tagged_users', function (Blueprint $table) {
            $table->bigIncrements('tagged_id');
            $table->bigInteger('tagged_post_id')->unsigned();
            $table->bigInteger('tagged_user_id')->unsigned();
            $table->foreign('tagged_post_id')->references('post_id')->on('posts');
            $table->foreign('tagged_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tagged_users');
    }
}
