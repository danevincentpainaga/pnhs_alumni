<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class business extends Model
{
    protected $primaryKey = 'business_id';
    public $timestamps = false;

    protected $fillable = [
        'business_type', 'business_name', 'business_started', 'b_uid'
    ];
}
