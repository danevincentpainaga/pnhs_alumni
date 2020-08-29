<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class friend_request extends Model
{
    protected $primaryKey = 'friend_requests_id';
    public $timestamps = false;

    protected $fillable = [
        'request_sender', 'request_reciever', 'confirmation_status', 'date_confirmed'
    ];
}
