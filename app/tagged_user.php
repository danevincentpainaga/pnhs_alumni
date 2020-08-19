<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class tagged_user extends Model
{
    protected $primaryKey = 'tagged_id ';
    public $timestamps = false;

    protected $fillable = [
        'tagged_post_id ', 'tagged_user_id '
    ];
}
