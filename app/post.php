<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    protected $primaryKey = 'post_id';

    protected $fillable = [
        'description', 'privacy', 'p_userid ', 'created_at', 'updated_at'
    ];
}
