<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class work_experience extends Model
{
    protected $primaryKey = 'work_experience_id';
    public $timestamps = false;

    protected $fillable = [
        'company_name', 'position', 'start_date', 'end_date', 'w_uid'
    ];
}
