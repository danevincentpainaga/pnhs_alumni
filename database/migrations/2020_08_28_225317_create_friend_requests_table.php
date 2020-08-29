<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friend_requests', function (Blueprint $table) {
            $table->bigIncrements('friend_requests_id');
            $table->bigInteger('request_sender')->unsigned();
            $table->bigInteger('request_reciever')->unsigned();
            $table->integer('confirmation_status');
            $table->timestamp('date_confirmed')->nullable();
            $table->foreign('request_sender')->references('id')->on('users');
            $table->foreign('request_reciever')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friend_requests');
    }
}
