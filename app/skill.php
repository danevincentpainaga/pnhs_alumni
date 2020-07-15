<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class skill extends Model
{
    protected $primaryKey = 'skills_id';
    public $timestamps = false;

    protected $fillable = [
        'skills', 's_uid '
    ];
}
